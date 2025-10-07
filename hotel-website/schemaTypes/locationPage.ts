import { defineType } from 'sanity'

export default defineType({
  name: 'locationPage',
  title: 'Location Page',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'The title that appears in the browser tab (e.g., "Location - Paradise Hotel")'
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main title for the location page'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Subtitle text below the main title'
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Background image for the hero section'
    },
    {
      name: 'address',
      title: 'Address Information',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string'
        },
        {
          name: 'city',
          title: 'City',
          type: 'string'
        },
        {
          name: 'state',
          title: 'State/Province',
          type: 'string'
        },
        {
          name: 'zipCode',
          title: 'ZIP/Postal Code',
          type: 'string'
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string'
        },
        {
          name: 'fullAddress',
          title: 'Full Address',
          type: 'text',
          description: 'Complete address as it should appear'
        }
      ]
    },
    {
      name: 'mapSettings',
      title: 'Map Settings',
      type: 'object',
      fields: [
        {
          name: 'latitude',
          title: 'Latitude',
          type: 'number',
          description: 'Map center latitude'
        },
        {
          name: 'longitude',
          title: 'Longitude',
          type: 'number',
          description: 'Map center longitude'
        },
        {
          name: 'zoom',
          title: 'Initial Map Zoom Level',
          type: 'number',
          description: 'Map zoom level when page loads (1-20)',
          validation: (Rule) => Rule.min(1).max(20)
        },
        {
          name: 'markerZoom',
          title: 'Marker Click Zoom Level',
          type: 'number',
          description: 'Map zoom level when marker is clicked (1-20)',
          validation: (Rule) => Rule.min(1).max(20)
        },
        {
          name: 'mapTitle',
          title: 'Map Title',
          type: 'string',
          description: 'Title above the map'
        }
      ]
    },
    {
      name: 'directions',
      title: 'Directions',
      type: 'object',
      fields: [
        {
          name: 'fromAirport',
          title: 'Directions from Airport',
          type: 'text'
        },
        {
          name: 'fromHighway',
          title: 'Directions from Highway',
          type: 'text'
        },
        {
          name: 'fromCityCenter',
          title: 'Directions from City Center',
          type: 'text'
        },
        {
          name: 'publicTransport',
          title: 'Public Transportation',
          type: 'text',
          description: 'Information about public transport options'
        }
      ]
    },
    {
      name: 'localAttractions',
      title: 'Local Attractions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Attraction Name',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'distance',
              title: 'Distance',
              type: 'string',
              description: 'e.g., "5 minutes walk" or "2 miles"'
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Restaurant', value: 'restaurant' },
                  { title: 'Shopping', value: 'shopping' },
                  { title: 'Entertainment', value: 'entertainment' },
                  { title: 'Nature', value: 'nature' },
                  { title: 'Culture', value: 'culture' },
                  { title: 'Sports', value: 'sports' }
                ]
              }
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image'
            }
          ]
        }
      ]
    },
    {
      name: 'parkingInfo',
      title: 'Parking Information',
      type: 'object',
      fields: [
        {
          name: 'onSiteParking',
          title: 'On-Site Parking',
          type: 'boolean'
        },
        {
          name: 'parkingDetails',
          title: 'Parking Details',
          type: 'text',
          description: 'Details about parking availability, cost, etc.'
        },
        {
          name: 'valetService',
          title: 'Valet Service',
          type: 'boolean'
        },
        {
          name: 'nearbyParking',
          title: 'Nearby Parking Options',
          type: 'text'
        }
      ]
    },
    {
      name: 'accessibility',
      title: 'Accessibility Information',
      type: 'object',
      fields: [
        {
          name: 'wheelchairAccessible',
          title: 'Wheelchair Accessible',
          type: 'boolean'
        },
        {
          name: 'accessibilityDetails',
          title: 'Accessibility Details',
          type: 'text',
          description: 'Specific accessibility features and information'
        },
        {
          name: 'specialNeedsContact',
          title: 'Special Needs Contact',
          type: 'string',
          description: 'Contact information for accessibility assistance'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'pageTitle'
    }
  }
})
