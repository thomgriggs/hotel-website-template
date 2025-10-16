export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
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
      title: 'Gallery Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
    },
    {
      name: 'photographer',
      title: 'Photographer',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Gallery Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding', value: 'wedding' },
          { title: 'Event', value: 'event' },
          { title: 'Property', value: 'property' },
          { title: 'Dining', value: 'dining' },
          { title: 'Amenities', value: 'amenities' }
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'featured',
      title: 'Featured Gallery',
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
      media: 'images.0'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Untitled Gallery',
        subtitle: subtitle || 'No category',
        media: media
      };
    }
  },
}




