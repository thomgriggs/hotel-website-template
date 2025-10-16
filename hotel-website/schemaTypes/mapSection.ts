export default {
  name: 'mapSection',
  title: 'Map Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      validation: Rule => Rule.min(-90).max(90),
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      validation: Rule => Rule.min(-180).max(180),
    },
    {
      name: 'zoom',
      title: 'Zoom Level',
      type: 'number',
      validation: Rule => Rule.min(1).max(20),
      initialValue: 13,
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'latitude'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Map Section',
        subtitle: subtitle ? `Lat: ${subtitle}` : 'No coordinates'
      };
    }
  }
}




