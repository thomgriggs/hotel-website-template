export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'pageTitle',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'intro',
      title: 'Page Introduction',
      type: 'object',
      fields: [
        { name: 'title', title: 'Intro Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
        { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, validation: (Rule: any) => Rule.optional() }
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'object', fields: [
          { name: 'title', title: 'Section Title', type: 'string' },
          { name: 'content', title: 'Content', type: 'text' }
        ]}
      ],
    },
    {
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'CTA Title', type: 'string' },
        { name: 'description', title: 'CTA Description', type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonUrl', title: 'Button URL', type: 'url' }
      ],
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
