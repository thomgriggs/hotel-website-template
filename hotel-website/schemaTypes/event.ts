export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
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
      title: 'Event Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'eventTime',
      title: 'Event Time',
      type: 'string',
    },
    {
      name: 'capacity',
      title: 'Max Capacity',
      type: 'number',
    },
    {
      name: 'price',
      title: 'Price per Person',
      type: 'number',
    },
    {
      name: 'location',
      title: 'Event Location',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Event Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding', value: 'wedding' },
          { title: 'Corporate', value: 'corporate' },
          { title: 'Social', value: 'social' },
          { title: 'Holiday', value: 'holiday' }
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'featured',
      title: 'Featured Event',
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
      subtitle: 'eventDate',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const date = subtitle ? new Date(subtitle).toLocaleDateString() : 'No date';
      return {
        title: title || 'Untitled Event',
        subtitle: date,
        media: media
      };
    }
  },
}




