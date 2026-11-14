import { buildCourseSeo } from './seo';

describe('seo helpers', () => {
  describe('buildCourseSeo', () => {
    it('returns course seo with data', () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com/');

      const seo = buildCourseSeo({
        id: '123',
        course: {
          name: 'React',
          tutorUsername: 'John',
          level: 'Avanzado',
          score: 4.8,
          price: '99.00',
          realPrice: '199.00',
        },
      });

      expect(seo.title).toBe('Curso React | Crashcourse');
      expect(seo.ogType).toBe('product');
      expect(seo.canonical).toBe('https://example.com/cursos/123');
      expect(seo.description).toContain('React');
      expect(seo.description).toContain('John');
      expect(seo.description).toContain('antes COP 199');
      expect(seo.jsonLd[0]).toMatchObject({
        offers: { price: 99, priceCurrency: 'COP' },
      });

      vi.unstubAllEnvs();
    });

    it('handles equal price and realPrice', () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');

      const seo = buildCourseSeo({
        id: '123',
        course: {
          name: 'React',
          tutorUsername: 'John',
          level: 'Avanzado',
          score: 4.8,
          price: 99,
          realPrice: 99,
        },
      });

      expect(seo.description).not.toContain('antes');

      vi.unstubAllEnvs();
    });

    it('truncates long course descriptions to the metadata limit', () => {
      const seo = buildCourseSeo({
        id: '123',
        course: {
          name: 'React '.repeat(40),
          tutorUsername: 'John',
          level: 'Avanzado',
          score: 4.8,
          price: 99,
          realPrice: 199,
        },
      });

      expect(seo.description.length).toBeLessThanOrEqual(155);
    });

    it('handles non-finite price', () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');

      const seo = buildCourseSeo({
        id: '123',
        course: {
          name: 'React',
          tutorUsername: 'John',
          level: 'Avanzado',
          score: 4.8,
          price: 'not-a-price',
          realPrice: 'not-a-price',
        },
      });

      expect(seo.description).toContain('Desde Precio no disponible.');
      expect(seo.jsonLd[0]).not.toHaveProperty('offers');

      vi.unstubAllEnvs();
    });

    it('returns fallback seo when course is null', () => {
      const seo = buildCourseSeo({ id: '123', course: null });

      expect(seo.title).toBe('Curso 123 | Crashcourse');
      expect(seo.noindex).toBe(true);
    });
  });
});
