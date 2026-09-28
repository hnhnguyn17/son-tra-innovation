// Run this function with a Playwright Page against the local Vite server.
// No extra application dependencies are required by this browser regression suite.
export default async function verifyOceanBackground(page) {
  await page.bringToFront();
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  const background = page.locator('.ocean-background');
  const ids = ['vung-thung', 'tri-thuc-so', 'chuyen-nguoi-bien', 'au-thuyen', 'di-san', 'khong-gian-trai-nghiem', 'mang-theo-cau-chuyen'];
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => localStorage.removeItem('sontra:ocean-paused'));
  await page.reload();
  await background.waitFor({ state: 'attached' });
  const dimensions = [];
  for (const width of [360, 390, 430, 844, 1440]) {
    await page.setViewportSize({ width, height: width === 844 ? 390 : 844 });
    await page.waitForFunction(() => {
      const dpr = Math.min(devicePixelRatio, innerWidth < 768 ? 1.5 : 2);
      return document.querySelector('.ocean-particles').width === Math.round(innerWidth * dpr);
    });
    const result = await page.evaluate(() => ({ width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth }));
    assert(!result.overflow, `Horizontal overflow at ${width}px`);
    dimensions.push(result);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ids) {
    await page.locator(`#${id}`).evaluate(element => element.scrollIntoView({ behavior: 'instant' }));
    await page.waitForFunction(id => document.querySelector('.ocean-background').dataset.oceanScene === id, id);
    assert(await page.locator('.ocean-object[data-active="true"]').count() <= 2, 'Mobile object budget exceeded');
  }
  await page.locator('#vung-thung').evaluate(element => element.scrollIntoView({ behavior: 'instant' }));
  const measure = () => page.evaluate(async () => {
    const context = document.querySelector('.ocean-particles').getContext('2d');
    const original = context.clearRect;
    let frames = 0;
    context.clearRect = function (...args) { frames++; return original.apply(this, args); };
    const start = performance.now();
    await new Promise(resolve => setTimeout(resolve, 1100));
    const seconds = (performance.now() - start) / 1000;
    context.clearRect = original;
    return { frames, fps: frames / seconds };
  });
  const running = await measure();
  assert(running.frames > 0 && running.fps <= 31, `Mobile Canvas exceeded frame budget: ${running.fps}`);
  // No manual motion preference or button; any dialog pauses the shared background.
  await page.evaluate(() => localStorage.setItem('sontra:ocean-paused', 'true'));
  await page.reload();
  await page.waitForFunction(() => document.querySelector('.ocean-background').dataset.paused === 'false');
  await page.getByRole('button', { name: 'Mở menu điều hướng', exact: true }).click();
  assert(await background.getAttribute('data-paused') === 'true', 'Menu did not pause ocean');
  assert((await measure()).frames === 0, 'Canvas draws behind menu');
  await page.keyboard.press('Escape');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => document.querySelector('.ocean-background').dataset.reducedMotion === 'true');
  assert((await measure()).frames === 0, 'Reduced motion still draws');
  assert(await page.locator('.ocean-drift').first().evaluate(e => getComputedStyle(e).animationName) === 'none', 'Reduced motion still animates CSS');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  // Synthetic visibility event verifies lifecycle logic; physical device testing is separate.
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForFunction(() => document.querySelector('.ocean-background').dataset.paused === 'true');
  assert((await measure()).frames === 0, 'Hidden tab still draws');
  await page.evaluate(() => {
    delete document.hidden;
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForFunction(() => document.querySelector('.ocean-background').dataset.paused === 'false');
  await page.setViewportSize({ width: 1440, height: 900 });
  const navigation = page.getByRole('button', { name: /^Chuyển đến \d/ });
  assert(await navigation.count() === 7, 'Expected seven chapter controls');
  for (let index = 0; index < ids.length; index++) {
    await navigation.nth(index).click();
    await page.waitForTimeout(900);
    assert(await background.getAttribute('data-ocean-scene') === ids[index], `Dot ${index} selected wrong scene`);
  }
  await page.getByRole('button', { name: 'Chế độ trình chiếu', exact: true }).click();
  assert(await page.evaluate(() => ['y', 'y proximity'].includes(getComputedStyle(document.documentElement).scrollSnapType)), 'Presentation should use proximity snap');
  await page.getByRole('button', { name: 'Chế độ trình chiếu', exact: true }).click();
  await page.locator('#di-san').evaluate(element => element.scrollIntoView({ behavior: 'instant' }));
  await page.waitForFunction(() => document.querySelector('.ocean-background').dataset.oceanScene === 'di-san');
  assert(await page.evaluate(() => !document.documentElement.classList.contains('snap-active')), 'Free scroll was not enabled');
  return { dimensions, chapters: ids.length, mobileCanvasFps: running.fps, legacyPauseIgnored: true, modal: true, reducedMotion: true, syntheticVisibility: true, dots: true, freeScroll: true };
}
