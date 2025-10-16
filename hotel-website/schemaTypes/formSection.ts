export default {
  name: 'formSection',
  title: 'Form Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
    },
    {
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Field Name',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'label',
              title: 'Field Label',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Number', value: 'number' },
                  { title: 'Phone', value: 'tel' }
                ],
                layout: 'radio'
              },
              validation: Rule => Rule.required(),
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }
          ]
        }
      ],
    }
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'formFields.length'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Form Section',
        subtitle: `${subtitle || 0} fields`
      };
    }
  }
}




