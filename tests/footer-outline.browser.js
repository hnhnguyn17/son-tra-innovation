// Execute with a Playwright Page already navigated to the local application.
export default async function verifyFooterOutline(page) {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const footer = page.locator('#mang-theo-cau-chuyen');
  const artwork = footer.locator('.story-footer-art img');
  const results = [];
  for (const width of [360, 390, 430, 768, 844, 1440]) {
    await page.setViewportSize({ width, height: width === 844 ? 390 : 900 });
    await footer.scrollIntoViewIfNeeded();
    const file = width < 768 ? 'outline-mobile.webp' : 'outline-desktop.webp';
    await page.waitForFunction(file => {
      const img = document.querySelector('.story-footer-art img');
      return img.complete && img.naturalWidth > 0 && img.currentSrc.endsWith(file);
    }, file);
    const layout = await footer.evaluate(el => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      touchTargets: [...el.querySelectorAll('a,button')].every(item => item.getBoundingClientRect().height >= 44),
      pointerEvents: getComputedStyle(el.querySelector('.story-footer-art')).pointerEvents,
      fit: getComputedStyle(el.querySelector('.story-footer-art img')).objectFit,
      position: getComputedStyle(el.querySelector('.story-footer-art')).position,
    }));
    assert(!layout.overflow, `Horizontal overflow at ${width}`);
    assert(layout.touchTargets, `Undersized touch target at ${width}`);
    assert(layout.pointerEvents === 'none', 'Decoration intercepts pointer input');
    assert(layout.position === 'absolute', 'Artwork must sit behind text, not reserve a separate row');
    if (width < 768) assert(layout.fit === 'contain', 'Mobile artwork may crop the whale');
    results.push({ width, file });
  }
  assert(await artwork.getAttribute('alt') === '', 'Decorative image needs empty alt');
  assert(await footer.locator('.story-footer-art').getAttribute('aria-hidden') === 'true', 'Decoration exposed to assistive technology');
  assert(await footer.locator('.story-footer-links a').count() === 7, 'Quick links changed');
  assert(await footer.locator('.story-footer-sources a').count() === 3, 'Sources changed');
  const validLinks = await footer.locator('.story-footer-links a').evaluateAll(links => links.every(link => document.querySelector(link.getAttribute('href'))));
  assert(validLinks, 'Broken local footer link');
  await page.setViewportSize({ width: 390, height: 844 });
  await footer.getByRole('link', { name: 'Kho tàng tri thức số', exact: false }).click();
  await page.waitForFunction(() => Math.abs(document.querySelector('#tri-thuc-so').getBoundingClientRect().top) < 120);
  await footer.scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await footer.getByRole('button', { name: 'Về đầu trang', exact: true }).click();
  await page.waitForFunction(() => scrollY < 2);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  // The decorative asset failing must not affect links or navigation.
  await page.route('**/assets/footer/*', route => route.abort());
  await page.reload();
  await footer.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.story-footer-art img').style.visibility === 'hidden');
  assert(await footer.getByRole('button', { name: 'Về đầu trang', exact: true }).isVisible(), 'Navigation lost on image failure');
  await page.unroute('**/assets/footer/*');
  assert(errors.length === 0, `Page errors: ${errors.join(', ')}`);
  return { responsive: results, links: 10, touchTargets: true, reducedMotionBackToTop: true, imageFailure: true, errors };
}
