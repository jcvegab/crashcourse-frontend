import { expect, test } from '@playwright/test';

test.describe('Smoke', () => {
  test('static checkout page renders with site metadata', async ({ page }) => {
    const response = await page.goto('/checkout');

    expect(response, 'navigation response').not.toBeNull();
    expect(response?.status(), 'checkout status').toBe(200);

    await expect(page).toHaveTitle(/Checkout \| Crashcourse/);
  });

  test('root URL responds', async ({ page }) => {
    const response = await page.goto('/');

    expect(response, 'navigation response').not.toBeNull();
    expect(response?.status(), 'root status').toBeLessThan(500);
  });
});
