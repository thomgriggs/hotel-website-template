export default {
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Frequently Asked Questions'
    },
    {
      name: 'questions',
      title: 'Questions & Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [{ type: 'block' }],
              validation: Rule => Rule.required()
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'General', value: 'general' },
                  { title: 'Rooms', value: 'rooms' },
                  { title: 'Dining', value: 'dining' },
                  { title: 'Amenities', value: 'amenities' },
                  { title: 'Booking', value: 'booking' },
                  { title: 'Policies', value: 'policies' }
                ]
              }
            },
            {
              name: 'featured',
              title: 'Featured Question',
              type: 'boolean',
              initialValue: false,
              description: 'Show this question prominently'
            }
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'category'
            }
          }
        }
      ]
    },
    {
      name: 'showCategories',
      title: 'Show Category Tabs',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Accordion', value: 'accordion' },
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' }
        ]
      },
      initialValue: 'accordion'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'questions.length'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'FAQ Section',
        subtitle: `${subtitle || 0} questions`
      };
    }
  }
}




