export default {
  name: 'roomsOverview',
  title: 'Rooms Overview Page',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'pageTitle',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'intro',
      title: 'Page Introduction',
      type: 'object',
      fields: [
        { name: 'title', title: 'Intro Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
        { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, validation: Rule => Rule.optional() }
      ],
      validation: Rule => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'textSection' },
        { type: 'imageTextSection' },
        { type: 'gallerySection' },
        { type: 'postGridSection' },
        { type: 'mapSection' },
        { type: 'formSection' },
        { type: 'testimonialsSection' },
        { type: 'ctaSection' },
        { type: 'faqSection' },
        { type: 'popoverSection' },
      ],
    },
    {
      name: 'cta',
      title: 'Call to Action Section',
      type: 'ctaSection',
    },
    {
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 },
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }
      ],
    }
  ],
  preview: {
    select: {
      title: 'pageTitle',
      subtitle: 'slug.current',
    },
  },
}
