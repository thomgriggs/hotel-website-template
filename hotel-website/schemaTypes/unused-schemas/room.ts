export default {
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Room Type',
      type: 'string',
      description: 'Choose a descriptive title that highlights the room\'s best features (e.g., "Ocean View Deluxe Suite")',
      validation: Rule => Rule.required().min(3).max(50)
        .custom(async (value, context) => {
          const { document } = context
          if (!value) return true
          
          const existing = await context.getClient({ apiVersion: '2023-01-01' }).fetch(
            `*[_type == "room" && title == $title && _id != $id][0]`,
            { title: value, id: document._id }
          )
          return existing ? 'Room title already exists' : true
        })
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title (auto-generated)',
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
      description: 'Write a compelling description that sells the experience. Include key amenities and unique features.',
      rows: 3,
      validation: Rule => Rule.required().min(50).max(500)
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      description: 'Add amenities that guests value most. Consider WiFi, parking, breakfast, spa access, etc.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
        list: [
          'WiFi',
          'Air Conditioning',
          'Mini Bar',
          'Room Service',
          'Daily Housekeeping',
          'Concierge Service',
          'Complimentary Breakfast',
          'Private Butler',
          'Spa Access',
          'Pool Access',
          'Fitness Center',
          'Business Center',
          'Parking',
          'Pet Friendly',
          'Balcony',
          'Ocean View',
          'City View',
          'Garden View'
        ]
      },
      validation: Rule => Rule.min(3).max(10)
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
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'Content workflow status',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Review', value: 'review' },
          { title: 'Published', value: 'published' }
        ]
      },
      initialValue: 'draft',
      validation: Rule => Rule.required()
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

