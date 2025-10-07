export default {
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Room Type',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility.'
            }
          ]
        }
      ]
    },
    {
      name: 'price',
      title: 'Starting Price (per night)',
      type: 'number',
      description: 'Price in USD'
    },
    {
      name: 'maxOccupancy',
      title: 'Maximum Occupancy',
      type: 'number',
      validation: Rule => Rule.min(1).max(10)
    },
    {
      name: 'roomSize',
      title: 'Room Size (sq ft)',
      type: 'number'
    },
    {
      name: 'bedType',
      title: 'Bed Type',
      type: 'string',
      options: {
        list: [
          {title: 'King Bed', value: 'king'},
          {title: 'Queen Bed', value: 'queen'},
          {title: 'Two Double Beds', value: 'double'},
          {title: 'Twin Beds', value: 'twin'},
          {title: 'Sofa Bed', value: 'sofa'}
        ]
      }
    },
    {
      name: 'featured',
      title: 'Featured Room',
      type: 'boolean',
      description: 'Check to feature this room on the homepage'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      price: 'price'
    },
    prepare(selection) {
      const {title, media, price} = selection
      return {
        title: title,
        media: media,
        subtitle: price ? `$${price}/night` : 'No price set'
      }
    }
  }
}

