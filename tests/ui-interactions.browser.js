// Additional lifecycle and failure scenarios; use a fresh Playwright page.
export default async function verifyUiInteractions(page) {
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  page.setDefaultTimeout(5000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.locator('#tri-thuc-so').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
  await page.evaluate(() => Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: undefined }));
  await page.locator('#tri-thuc-so').getByRole('button', { name: 'Nghe giọng đọc tổng hợp', exact: true }).click();
  assert((await page.locator('#tri-thuc-so .feedback').innerText()).includes('chưa hỗ trợ'), 'Unsupported speech should explain the limitation');
  await page.evaluate(() => {
    window.testUtterance = null;
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
      speak: utterance => { window.testUtterance = utterance; }, cancel: () => {},
    } });
  });
  const speech = page.locator('#tri-thuc-so .speech-control button');
  await speech.click();
  assert((await speech.innerText()).includes('chuẩn bị'), 'Speech must not report playback before onstart');
  await page.evaluate(() => window.testUtterance.onstart());
  assert((await speech.innerText()).includes('Dừng'), 'Speech did not reflect onstart');
  await page.evaluate(() => window.testUtterance.onerror());
  assert((await page.locator('#tri-thuc-so .feedback').innerText()).includes('Chưa phát được'), 'Speech errors are not visible');

  await page.locator('#khong-gian-trai-nghiem').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('denied')) } }));
  await page.getByRole('button', { name: 'Chia sẻ', exact: true }).click();
  assert(await page.locator('.share-fallback input').count() === 1, 'Clipboard failure needs a copyable fallback');
  assert(!(await page.locator('#khong-gian-trai-nghiem [role="status"]').innerText()).includes('Đã sao'), 'False copy success');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.resolve() } }));
  await page.getByRole('button', { name: 'Chia sẻ', exact: true }).click();
  assert((await page.locator('#khong-gian-trai-nghiem [role="status"]').innerText()).includes('Đã sao'), 'Successful copy not acknowledged');

  await page.locator('#di-san-noi-dung').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
  await page.getByRole('button', { name: 'Sóng lưới động', exact: true }).click();
  const mesh = page.locator('.interaction-card').first();
  await page.locator('.mesh-stage').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.interaction-card').dataset.motionPaused === 'false');
  const canvas = page.locator('#di-san canvas');
  const first = await canvas.evaluate(el => el.toDataURL());
  await page.waitForTimeout(180);
  assert(first !== await canvas.evaluate(el => el.toDataURL()), 'Visible mesh does not animate');
  await page.locator('#tri-thuc-so').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
  await page.waitForFunction(() => document.querySelector('.interaction-card').dataset.motionPaused === 'true');
  const paused = await canvas.evaluate(el => el.toDataURL());
  await page.waitForTimeout(180);
  assert(paused === await canvas.evaluate(el => el.toDataURL()), 'Offscreen mesh still draws');
  await mesh.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForFunction(() => document.querySelector('.interaction-card').dataset.motionPaused === 'true');
  const hidden = await canvas.evaluate(el => el.toDataURL());
  await page.waitForTimeout(180);
  assert(hidden === await canvas.evaluate(el => el.toDataURL()), 'Hidden tab mesh still draws');
  await page.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });

  const grip = page.getByRole('button', { name: 'Điểm nắm kéo lưới', exact: true });
  await grip.scrollIntoViewIfNeeded();
  const bounds = await grip.boundingBox();
  await page.mouse.move(bounds.x + 24, bounds.y + 24);
  await page.mouse.down();
  await page.mouse.move(bounds.x + 76, bounds.y + 24, { steps: 6 });
  await page.mouse.up();
  assert((await page.locator('.rope-result [role="status"]').innerText()).includes('1 nhịp'), 'Dragging rope did not count exactly one pull');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Kéo tiếp', exact: true }).click();
  assert((await page.locator('.rope-result [role="status"]').innerText()).includes('2 nhịp'), 'Reduced motion disabled the interaction result');
  assert(await grip.evaluate(el => getComputedStyle(el).transform === 'matrix(1, 0, 0, 1, 0, 0)'), 'Reduced motion rope still shifts');
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  const context = await page.context().browser().newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  const touch = await context.newPage();
  try {
    await touch.goto(page.url());
    await touch.locator('#di-san-noi-dung').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
    await touch.getByRole('button', { name: 'Sóng lưới động', exact: true }).tap();
    const target = touch.locator('.mesh-stage');
    await target.scrollIntoViewIfNeeded();
    const box = await target.boundingBox();
    const cdp = await context.newCDPSession(touch);
    const x = box.x + box.width / 2, y = box.y + box.height * .8;
    const initialScroll = await touch.evaluate(() => scrollY);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let i = 1; i <= 6; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - i * 20 }] });
      await touch.waitForTimeout(20);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await touch.waitForTimeout(200);
    assert(await touch.evaluate(() => scrollY) > initialScroll + 30, 'Vertical touch on mesh trapped page scrolling');
    await target.scrollIntoViewIfNeeded();
    await touch.emulateMedia({ reducedMotion: 'reduce' });
    await touch.waitForTimeout(100);
    const horizontal = await target.boundingBox();
    const startX = horizontal.x + 60, startY = horizontal.y + horizontal.height / 2;
    const beforeTouch = await touch.locator('#di-san canvas').evaluate(el => el.toDataURL());
    const beforeScroll = await touch.evaluate(() => scrollY);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: startX, y: startY }] });
    for (let i = 1; i <= 5; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: startX + i * 20, y: startY }] });
    assert(beforeTouch !== await touch.locator('#di-san canvas').evaluate(el => el.toDataURL()), 'Horizontal touch does not deform the static mesh');
    assert(Math.abs(await touch.evaluate(() => scrollY) - beforeScroll) < 4, 'Horizontal mesh drag moved the page');
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await cdp.detach();
  } finally { await context.close(); }
  return { speechLifecycle: true, clipboardFailureAndSuccess: true, canvasVisibleOffscreenHidden: true, ropeDragAndReducedMotion: true, nativeTouchScroll: true };
}
