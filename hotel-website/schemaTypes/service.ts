export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Service Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'duration',
      title: 'Service Duration',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Service Price',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'Spa & Wellness', value: 'spa' },
          { title: 'Concierge', value: 'concierge' },
          { title: 'Transportation', value: 'transportation' },
          { title: 'Dining', value: 'dining' },
          { title: 'Entertainment', value: 'entertainment' }
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
    },
    {
      name: 'bookingRequired',
      title: 'Booking Required',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      initialValue: false,
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
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Untitled Service',
        subtitle: subtitle || 'No category',
        media: media
      };
    }
  },
}




