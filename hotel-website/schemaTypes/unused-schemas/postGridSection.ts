export default {
  name: 'postGridSection',
  title: 'Post Grid Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'Rooms', value: 'rooms' },
          { title: 'Dining', value: 'dining' },
          { title: 'Amenities', value: 'amenities' },
          { title: 'Events', value: 'events' },
          { title: 'Services', value: 'services' },
          { title: 'Gallery', value: 'gallery' }
        ],
        layout: 'radio'
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featuredOnly',
      title: 'Show Featured Only',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'limit',
      title: 'Limit Number of Posts',
      type: 'number',
      initialValue: 6,
      validation: (Rule: any) => Rule.min(1).max(20),
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'postType'
    },
    prepare(selection: any) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Post Grid',
        subtitle: `Show ${subtitle || 'posts'}`
      };
    }
  }
}
