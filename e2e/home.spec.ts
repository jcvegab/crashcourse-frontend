import { expect, test } from '@playwright/test';

test.describe('Home', () => {
  test('renders header and category section from server data', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(
      page.getByRole('link', { name: /Regístrate gratis/ }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: /Categorias/i }),
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: /Listado de cursos/i }),
    ).toBeVisible();
  });

  test('exposes SEO metadata on the home page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Crashcourse');

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /Aprende con cursos/);
  });
});
