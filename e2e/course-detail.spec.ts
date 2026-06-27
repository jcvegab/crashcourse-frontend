import { expect, test } from '@playwright/test';

const KNOWN_COURSE_ID = '1';
const UNKNOWN_COURSE_ID = '99999999';

test.describe('Course detail', () => {
  test('renders server data and exposes course metadata', async ({ page }) => {
    await page.goto(`/cursos/${KNOWN_COURSE_ID}`);

    await expect(
      page.getByRole('heading', { name: /Animação Frame a Frame/i }),
    ).toBeVisible();

    await expect(page).toHaveTitle(/Curso .* \| Crashcourse/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /Curso de/);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute(
      'href',
      new RegExp(`/cursos/${KNOWN_COURSE_ID}$`),
    );

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Curso /);

    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute(
      'content',
      new RegExp(`/cursos/${KNOWN_COURSE_ID}$`),
    );

    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');

    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const jsonLdContent = await jsonLd.first().textContent();
    expect(jsonLdContent).toContain('"@type":"Course"');
  });

  test('returns 404 when the course does not exist', async ({ page }) => {
    const response = await page.goto(`/cursos/${UNKNOWN_COURSE_ID}`);

    expect(response, 'navigation response').not.toBeNull();
    expect(response?.status(), 'unknown course status').toBe(404);
  });
});
