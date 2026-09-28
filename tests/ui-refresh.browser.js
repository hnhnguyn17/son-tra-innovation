// Run with a Playwright Page opened at the local application. No production data is changed.
export default async function verifyUiRefresh(page) {
  await page.bringToFront();
  page.setDefaultTimeout(5000);
  const results = [];
  const check = async (name, run) => {
    try { await run(); results.push({ name, passed: true }); }
    catch (error) { results.push({ name, passed: false, error: error.message }); }
  };
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await check('Filters select a matching detail', async () => {
    await page.locator('#tri-thuc-so').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
    await page.getByText('Ẩm thực làng cá', { exact: true }).click();
    const headings = await page.locator('#tri-thuc-so h3').allTextContents();
    assert(headings.length > 0 && headings.every(text => /Hải Sản|Ẩm Thực/i.test(text)), 'Detail still shows a destination outside the filter');
  });
  await check('Empty search clears stale details', async () => {
    await page.locator('#tri-thuc-so input').fill('no-matching-destination-xyz');
    assert(await page.locator('#tri-thuc-so h3').count() === 0, 'A stale detail survives empty results');
    await page.locator('#tri-thuc-so input').fill('');
  });
  await check('Native scrolling is the default', async () => {
    assert(await page.evaluate(() => !document.documentElement.classList.contains('snap-active')), 'Forced chapter scrolling is enabled by default');
  });
  await check('No editor controls or fake media play action', async () => {
    assert(await page.getByRole('button', { name: /Chèn video|Chèn tư liệu|Xem thước phim cửa biển/ }).count() === 0, 'Editor or unavailable-video action is visible');
  });
  await check('Gallery opens an accessible dismissible lightbox', async () => {
    const gallery = page.locator('#khong-gian-trai-nghiem');
    await gallery.evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
    const image = gallery.locator('img').first();
    await image.locator('../..').click();
    const dialog = page.getByRole('dialog');
    await dialog.waitFor();
    assert(await dialog.evaluate(el => el.contains(document.activeElement)), 'Focus did not enter lightbox');
    assert(await page.evaluate(() => getComputedStyle(document.body).overflowY === 'hidden'), 'Body is not locked');
    await page.keyboard.press('Escape');
    assert(await dialog.count() === 0, 'Escape does not close lightbox');
  });
  await page.reload();
  await check('Mobile menu traps and restores keyboard focus', async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    const trigger = page.getByRole('button', { name: 'Mở menu điều hướng', exact: true });
    await trigger.click();
    for (let index = 0; index < 12; index++) {
      await page.keyboard.press('Tab');
      assert(await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]')), 'Tab escaped menu');
    }
    await page.keyboard.press('Escape');
    assert(await trigger.evaluate(el => el === document.activeElement), 'Focus was not restored');
  });
  await page.reload();
  await check('Reduced motion freezes the net canvas', async () => {
    await page.locator('#di-san-noi-dung').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
    await page.getByRole('button', { name: 'Sóng lưới động', exact: true }).click();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(100);
    const canvas = page.locator('#di-san canvas');
    const before = await canvas.evaluate(el => el.toDataURL());
    await page.waitForTimeout(160);
    assert(before === await canvas.evaluate(el => el.toDataURL()), 'Canvas still animates under reduced motion');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  });
  return results;
}
