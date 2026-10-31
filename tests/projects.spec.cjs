const {test, expect} = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.beforeEach(async ({page}) => {
  // The existing site's icon kit is outside this feature and not needed by it.
  await page.route('https://kit.fontawesome.com/**', route => route.abort());
  await page.goto('/#potfolio');
  await page.locator('.project-card').first().waitFor();
});

test('catalog renders real assets and filters by category', async ({page}) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await expect(page.locator('.project-card')).toHaveCount(9);
  await expect(page.locator('.project-featured')).toHaveCount(4);
  for (const [label, total] of [['Featured', 4], ['Commerce', 2], ['Platforms', 5], ['More projects', 2], ['All projects', 9]]) {
    await page.getByRole('button', {name: label, exact: true}).click();
    await expect(page.locator('.project-card')).toHaveCount(total);
    await expect(page.getByRole('button', {name: label, exact: true})).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#projects-count')).toHaveText(`${String(total).padStart(2, '0')} projects`);
  }
  for (const img of await page.locator('.project-visual img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  }
  expect(errors).toEqual([]);
  const links = await page.locator('#potfolio a[target="_blank"]').evaluateAll(items => items.map(a => ({href: a.href, rel: a.rel})));
  for (const link of links) {expect(link.href).toMatch(/^https:\/\//); expect(link.rel).toContain('noopener');}
});

test('details support keyboard, focus containment, Escape, and close button', async ({page}) => {
  const trigger = page.locator('.project-detail-button').first();
  await trigger.focus(); await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', {name: 'Booking OS', exact: true})).toBeVisible();
  for (let index = 0; index < 7; index++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement.closest('dialog') !== null)).toBe(true);
  }
  await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible(); await expect(trigger).toBeFocused();
  await page.locator('.project-visual[data-project="neram"]').click();
  await expect(dialog.getByRole('heading', {name: 'Neram', exact: true})).toBeVisible();
  await page.getByRole('button', {name: 'Close project details'}).click(); await expect(dialog).not.toBeVisible();
  await page.getByRole('button', {name: 'Finance Tracker', exact: true}).click();
  await expect(dialog).toContainText('have not been supplied yet');
  await expect(dialog.locator('a')).toHaveCount(0);
});

test('project section and open dialog pass accessibility checks', async ({page}) => {
  let results = await new AxeBuilder({page}).include('#potfolio').analyze();
  expect(results.violations).toEqual([]);
  await page.locator('.project-detail-button').first().click();
  results = await new AxeBuilder({page}).include('#project-dialog').analyze();
  expect(results.violations).toEqual([]);
});

test('responsive layouts have no section overflow and honor reduced motion', async ({page}) => {
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({width, height: 900});
    expect(await page.locator('#potfolio').evaluate(section => section.scrollWidth <= section.clientWidth)).toBe(true);
    await page.locator('.project-detail-button').first().click();
    expect(await page.locator('#project-dialog').evaluate(dialog => dialog.scrollWidth <= dialog.clientWidth)).toBe(true);
    await page.getByRole('button', {name: 'Close project details'}).click();
  }
  await page.emulateMedia({reducedMotion: 'reduce'});
  expect(await page.locator('.project-card').first().evaluate(card => window.getComputedStyle(card).animationName)).toBe('none');
});
