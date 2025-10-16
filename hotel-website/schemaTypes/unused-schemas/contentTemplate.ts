export default {
  name: 'contentTemplate',
  title: 'Content Template',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Template Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Room', value: 'room' },
          { title: 'Dining', value: 'dining' },
          { title: 'Amenity', value: 'amenity' },
          { title: 'Page', value: 'page' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'templateData',
      title: 'Template Data',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Default Title',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Default Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'amenities',
          title: 'Default Amenities',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'pricing',
          title: 'Default Pricing',
          type: 'object',
          fields: [
            {
              name: 'base',
              title: 'Base Price',
              type: 'number'
            },
            {
              name: 'currency',
              title: 'Currency',
              type: 'string',
              options: {
                list: [
                  { title: 'USD', value: 'USD' },
                  { title: 'EUR', value: 'EUR' },
                  { title: 'GBP', value: 'GBP' }
                ]
              }
            }
          ]
        },
        {
          name: 'capacity',
          title: 'Default Capacity',
          type: 'number'
        },
        {
          name: 'size',
          title: 'Default Size',
          type: 'string'
        },
        {
          name: 'bedType',
          title: 'Default Bed Type',
          type: 'string'
        },
        {
          name: 'view',
          title: 'Default View',
          type: 'string'
        },
        {
          name: 'cuisine',
          title: 'Default Cuisine',
          type: 'string'
        },
        {
          name: 'priceRange',
          title: 'Default Price Range',
          type: 'string',
          options: {
            list: [
              { title: '$ (Budget)', value: '$' },
              { title: '$$ (Moderate)', value: '$$' },
              { title: '$$$ (Upscale)', value: '$$$' },
              { title: '$$$$ (Fine Dining)', value: '$$$$' }
            ]
          }
        },
        {
          name: 'hours',
          title: 'Default Hours',
          type: 'string'
        },
        {
          name: 'location',
          title: 'Default Location',
          type: 'string'
        },
        {
          name: 'category',
          title: 'Default Category',
          type: 'string'
        },
        {
          name: 'features',
          title: 'Default Features',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        }
      ]
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'contentType',
      media: 'templateData.image'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: `${subtitle} Template`
      }
    }
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [
        { field: 'sortOrder', direction: 'asc' },
        { field: 'name', direction: 'asc' }
      ]
    }
  ]
}



