// Execute with a Playwright Page navigated to the local application.
export default async function verifyCinematicBackground(page) {
  const assert = (value, message) => { if (!value) throw new Error(message); };
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => localStorage.removeItem('sontra:ocean-paused'));
  await page.reload();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForFunction(() => document.querySelector('.ocean-background').dataset.artworkReady === 'true');
  const initialImages = await page.locator('.ocean-artwork img').count();
  assert(initialImages === 1, 'QR entry must fetch only the entrance artwork');
  assert((await page.locator('.ocean-artwork img').getAttribute('src')).includes('coast'), 'Wrong first scene');
  assert((await page.locator('.ocean-artwork img').evaluate(img => img.currentSrc)).endsWith('coast-960.webp'), 'Mobile must select small WebP');
  assert(await page.locator('h1').count() === 1, 'Exactly one page-level heading expected');

  for (const [section, artwork, target] of [
    ['vung-thung', 'coast', 'cua-bien-noi-dung'],
    ['au-thuyen', 'harbor', 'au-thuyen-noi-dung'],
    ['di-san', 'whale', 'di-san-noi-dung'],
  ]) {
    await page.locator(`#${section}`).evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
    await page.waitForFunction(section => document.querySelector('.ocean-background').dataset.oceanScene === section, section);
    await page.waitForFunction(artwork => document.querySelector(`.ocean-artwork[data-artwork="${artwork}"]`)?.dataset.visible === 'true', artwork);
    await page.locator(`#${section} .cinematic-explore`).click();
    await page.waitForFunction(target => {
      const top = document.getElementById(target).getBoundingClientRect().top;
      return top >= -2 && top < 200;
    }, target);
    assert(await page.locator('.ocean-background').getAttribute('data-ocean-scene') === section, 'Reading surface must retain its chapter');
  }
  await page.getByRole('button', { name: 'Thúng chai nan tre', exact: true }).click();
  assert(await page.locator('.heritage-story > .content-change').getByRole('heading', { name: 'Hồn cốt Thúng Chai & Nghề đan nan tre', exact: true }).count() === 1, 'Heritage carousel was lost');

  for (const width of [360, 390, 430, 844, 1440]) {
    await page.setViewportSize({ width, height: width === 844 ? 390 : 900 });
    await page.waitForTimeout(150);
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`);
  }
  await page.locator('#vung-thung').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(900);
  await page.mouse.move(600, 500);
  await page.mouse.wheel(0, 550);
  await page.waitForTimeout(900);
  assert(await page.locator('.ocean-background').getAttribute('data-ocean-scene') === 'vung-thung', 'Desktop wheel skipped hero reading surface');
  await page.locator('#vung-thung .cinematic-explore').click();
  await page.waitForTimeout(900);
  assert(await page.locator('#cua-bien-noi-dung').evaluate(el => Math.abs(el.getBoundingClientRect().top) < 200), 'Desktop detail anchor did not land on content');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('.ocean-background').dataset.reducedMotion === 'true');
  assert(await page.locator('.ocean-waterlight').evaluate(el => getComputedStyle(el).animationName) === 'none', 'Water still moves with reduced motion');
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  // Simulate image delivery failure: content and procedural fallback must survive.
  await page.route('**/assets/ocean/*', route => route.abort());
  await page.reload();
  await page.waitForTimeout(500);
  assert(await page.locator('.ocean-background').getAttribute('data-artwork-ready') === 'false', 'Failed image marked ready');
  assert(await page.locator('.cinematic-title').first().isVisible(), 'Heading lost when image fails');
  await page.unroute('**/assets/ocean/*');
  assert(errors.length === 0, `Runtime errors: ${errors.join(', ')}`);
  return { initialImages, chapters: 3, responsive: true, readingAnchors: true, desktopWheel: true, carousel: true, reducedMotion: true, imageFallback: true, errors };
}
