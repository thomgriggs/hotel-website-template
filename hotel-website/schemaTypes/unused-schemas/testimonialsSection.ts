export default {
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required(),
            },
            {
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'rating',
              title: 'Rating (1-5)',
              type: 'number',
              validation: Rule => Rule.min(1).max(5),
            },
            {
              name: 'authorTitle',
              title: 'Author Title/Position',
              type: 'string',
            }
          ]
        }
      ],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' }
        ],
        layout: 'radio'
      },
      initialValue: 'grid'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'testimonials.length'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Testimonials Section',
        subtitle: `${subtitle || 0} testimonials`
      };
    }
  }
}




