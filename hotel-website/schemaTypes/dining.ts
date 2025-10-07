export default {
  name: 'dining',
  title: 'Dining',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
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
      name: 'cuisine',
      title: 'Cuisine Type',
      type: 'string',
      options: {
        list: [
          {title: 'Fine Dining', value: 'fine-dining'},
          {title: 'Casual Dining', value: 'casual'},
          {title: 'Bar & Grill', value: 'bar-grill'},
          {title: 'Cafe', value: 'cafe'},
          {title: 'Room Service', value: 'room-service'},
          {title: 'Buffet', value: 'buffet'},
          {title: 'International', value: 'international'},
          {title: 'Local Cuisine', value: 'local'}
        ]
      }
    },
    {
      name: 'hours',
      title: 'Operating Hours',
      type: 'object',
      fields: [
        {
          name: 'breakfast',
          title: 'Breakfast Hours',
          type: 'string',
          placeholder: 'e.g., 7:00 AM - 10:00 AM'
        },
        {
          name: 'lunch',
          title: 'Lunch Hours',
          type: 'string',
          placeholder: 'e.g., 11:30 AM - 2:30 PM'
        },
        {
          name: 'dinner',
          title: 'Dinner Hours',
          type: 'string',
          placeholder: 'e.g., 5:30 PM - 10:00 PM'
        }
      ]
    },
    {
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      options: {
        list: [
          {title: '$', value: '$'},
          {title: '$$', value: '$$'},
          {title: '$$$', value: '$$$'},
          {title: '$$$$', value: '$$$$'}
        ]
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
      name: 'menuHighlights',
      title: 'Menu Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'dish',
              title: 'Dish Name',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number'
            }
          ]
        }
      ]
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Lobby Level, Poolside, Rooftop'
    },
    {
      name: 'reservations',
      title: 'Reservations Required',
      type: 'boolean'
    },
    {
      name: 'featured',
      title: 'Featured Restaurant',
      type: 'boolean',
      description: 'Check to feature this restaurant on the homepage'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      cuisine: 'cuisine',
      priceRange: 'priceRange'
    },
    prepare(selection) {
      const {title, media, cuisine, priceRange} = selection
      return {
        title: title,
        media: media,
        subtitle: `${cuisine || 'Restaurant'} ${priceRange ? `• ${priceRange}` : ''}`
      }
    }
  }
}

