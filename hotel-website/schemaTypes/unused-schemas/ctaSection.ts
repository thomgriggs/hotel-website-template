export default {
  name: 'ctaSection',
  title: 'Call to Action Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'buttonLink',
    },
    {
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'buttonLink',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Accent', value: 'accent' },
          { title: 'Neutral', value: 'neutral' }
        ],
        layout: 'radio'
      },
      initialValue: 'primary'
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'primaryButton.label'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'CTA Section',
        subtitle: subtitle ? `Primary: ${subtitle}` : 'No buttons set'
      };
    }
  }
}




