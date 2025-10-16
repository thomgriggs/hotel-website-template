export default {
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Single Column', value: 'single' },
          { title: 'Side by Side', value: 'side-by-side' }
        ],
        layout: 'radio'
      },
      initialValue: 'single'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'content.0.children.0.text'
    }
  }
}




