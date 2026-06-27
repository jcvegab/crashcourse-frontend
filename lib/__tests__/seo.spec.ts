import {
  buildCourseSeo,
  buildHomeSeo,
  buildSeo,
  serializeJsonLd,
} from '../seo';

describe('seo helpers', () => {
  describe('buildSeo', () => {
    it('includes site name in title', () => {
      const seo = buildSeo({
        title: 'Test',
        description: 'Description',
      });

      expect(seo.title).toBe('Test | Crashcourse');
    });

    it('does not duplicate site name if already present', () => {
      const seo = buildSeo({
        title: 'Test | Crashcourse',
        description: 'Description',
      });

      expect(seo.title).toBe('Test | Crashcourse');
    });

    it('truncates long descriptions', () => {
      const longDesc = 'a'.repeat(200);
      const seo = buildSeo({
        title: 'Test',
        description: longDesc,
      });

      expect(seo.description.length).toBeLessThanOrEqual(155);
    });

    it('builds canonical from site url and path', () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');

      const seo = buildSeo({
        title: 'Test',
        description: 'Desc',
        path: '/cursos/123',
      });

      expect(seo.canonical).toBe('https://example.com/cursos/123');

      vi.unstubAllEnvs();
    });
  });

  describe('buildHomeSeo', () => {
    it('returns home seo tags', () => {
      const seo = buildHomeSeo();

      expect(seo.title).toBe('Crashcourse');
      expect(seo.ogType).toBe('website');
    });
  });

  describe('buildCourseSeo', () => {
    it('returns course seo with data', () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');

      const seo = buildCourseSeo({
        id: '123',
        course: {
          name: 'React',
          tutorUsername: 'John',
          level: 'Avanzado',
          score: 4.8,
          price: 99,
          realPrice: 199,
        },
      });

      expect(seo.title).toBe('Curso React | Crashcourse');
      expect(seo.ogType).toBe('product');
      expect(seo.canonical).toBe('https://example.com/cursos/123');
      expect(seo.description).toContain('React');
      expect(seo.description).toContain('John');
      expect(seo.description).toContain('antes S/ 199.00');

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

    it('handles non-finite price', () => {
      vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');

      const seo = buildCourseSeo({
        id: '123',
        course: {
          name: 'React',
          tutorUsername: 'John',
          level: 'Avanzado',
          score: 4.8,
          price: Number.NaN,
          realPrice: Number.NaN,
        },
      });

      expect(seo.description).toContain('React');

      vi.unstubAllEnvs();
    });

    it('returns fallback seo when course is null', () => {
      const seo = buildCourseSeo({ id: '123', course: null });

      expect(seo.title).toBe('Curso 123 | Crashcourse');
      expect(seo.noindex).toBe(true);
    });
  });

  describe('serializeJsonLd', () => {
    it('escapes angle brackets', () => {
      const data = { '@type': 'Course', name: '<script>' };
      const serialized = serializeJsonLd(data);

      expect(serialized).not.toContain('<');
      expect(serialized).toContain('\\u003c');
    });
  });
});
