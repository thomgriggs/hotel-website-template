export default {
  name: 'imageTextSection',
  title: 'Image + Text Section',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Image Left', value: 'image-left' },
          { title: 'Image Right', value: 'image-right' }
        ],
        layout: 'radio'
      },
      initialValue: 'image-left'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'content.0.children.0.text',
      media: 'image'
    }
  }
}




