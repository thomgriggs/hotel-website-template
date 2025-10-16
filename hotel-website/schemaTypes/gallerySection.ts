export default {
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
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
          { title: 'Masonry', value: 'masonry' }
        ],
        layout: 'radio'
      },
      initialValue: 'grid'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'images.length',
      media: 'images.0'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Gallery Section',
        subtitle: `${subtitle || 0} images`,
        media: media
      };
    }
  }
}




