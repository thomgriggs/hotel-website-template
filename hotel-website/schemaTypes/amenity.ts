export default {
  name: 'amenity',
  title: 'Amenity',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Amenity Name',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Spa & Wellness', value: 'spa-wellness'},
          {title: 'Fitness', value: 'fitness'},
          {title: 'Pool & Recreation', value: 'pool-recreation'},
          {title: 'Business', value: 'business'},
          {title: 'Concierge', value: 'concierge'},
          {title: 'Transportation', value: 'transportation'},
          {title: 'Entertainment', value: 'entertainment'},
          {title: 'General', value: 'general'}
        ]
      }
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Material Symbol icon name (e.g., pool, spa, fitness_center)',
      placeholder: 'pool'
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
      name: 'hours',
      title: 'Operating Hours',
      type: 'object',
      fields: [
        {
          name: 'monday',
          title: 'Monday',
          type: 'string',
          placeholder: 'e.g., 6:00 AM - 10:00 PM'
        },
        {
          name: 'tuesday',
          title: 'Tuesday',
          type: 'string',
          placeholder: 'e.g., 6:00 AM - 10:00 PM'
        },
        {
          name: 'wednesday',
          title: 'Wednesday',
          type: 'string',
          placeholder: 'e.g., 6:00 AM - 10:00 PM'
        },
        {
          name: 'thursday',
          title: 'Thursday',
          type: 'string',
          placeholder: 'e.g., 6:00 AM - 10:00 PM'
        },
        {
          name: 'friday',
          title: 'Friday',
          type: 'string',
          placeholder: 'e.g., 6:00 AM - 10:00 PM'
        },
        {
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
          placeholder: 'e.g., 6:00 AM - 10:00 PM'
        },
        {
          name: 'sunday',
          title: 'Sunday',
          type: 'string',
          placeholder: 'e.g., 6:00 AM - 10:00 PM'
        }
      ]
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., 3rd Floor, Pool Level, Lobby'
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'ageRestriction',
      title: 'Age Restriction',
      type: 'string',
      options: {
        list: [
          {title: 'All Ages', value: 'all'},
          {title: 'Adults Only (18+)', value: 'adults'},
          {title: 'Children Welcome', value: 'children'},
          {title: 'Teens & Adults (13+)', value: 'teens-adults'}
        ]
      }
    },
    {
      name: 'reservationRequired',
      title: 'Reservation Required',
      type: 'boolean'
    },
    {
      name: 'additionalFee',
      title: 'Additional Fee',
      type: 'boolean',
      description: 'Check if this amenity requires an additional fee'
    },
    {
      name: 'feeAmount',
      title: 'Fee Amount',
      type: 'number',
      description: 'Fee amount in USD (if applicable)',
      hidden: ({document}) => !document?.additionalFee
    },
    {
      name: 'featured',
      title: 'Featured Amenity',
      type: 'boolean',
      description: 'Check to feature this amenity on the homepage'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      category: 'category'
    },
    prepare(selection) {
      const {title, media, category} = selection
      return {
        title: title,
        media: media,
        subtitle: category || 'Amenity'
      }
    }
  }
}

