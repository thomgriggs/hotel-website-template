import { defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'The title that appears in the browser tab (e.g., "Contact Us - Paradise Hotel")'
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main title for the contact page'
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
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text'
        },
        {
          name: 'hours',
          title: 'Business Hours',
          type: 'text',
          description: 'e.g., "Monday - Friday: 9:00 AM - 6:00 PM"'
        }
      ]
    },
    {
      name: 'contactForm',
      title: 'Contact Form Settings',
      type: 'object',
      fields: [
        {
          name: 'formTitle',
          title: 'Form Title',
          type: 'string',
          description: 'Title above the contact form'
        },
        {
          name: 'formDescription',
          title: 'Form Description',
          type: 'text',
          description: 'Description text above the form'
        },
        {
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          description: 'Text for the form submit button'
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
                  type: 'string'
                },
                {
                  name: 'label',
                  title: 'Field Label',
                  type: 'string'
                },
                {
                  name: 'type',
                  title: 'Field Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Text', value: 'text' },
                      { title: 'Email', value: 'email' },
                      { title: 'Phone', value: 'tel' },
                      { title: 'Textarea', value: 'textarea' },
                      { title: 'Select', value: 'select' }
                    ]
                  }
                },
                {
                  name: 'required',
                  title: 'Required',
                  type: 'boolean'
                },
                {
                  name: 'placeholder',
                  title: 'Placeholder Text',
                  type: 'string'
                },
                {
                  name: 'options',
                  title: 'Options (for select fields)',
                  type: 'array',
                  of: [{ type: 'string' }],
                  hidden: ({ parent }) => parent?.type !== 'select'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'mapSettings',
      title: 'Map Settings',
      type: 'object',
      fields: [
        {
          name: 'showMap',
          title: 'Show Map',
          type: 'boolean',
          description: 'Whether to display a map on the contact page'
        },
        {
          name: 'mapTitle',
          title: 'Map Title',
          type: 'string',
          description: 'Title above the map'
        },
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
        }
      ]
    },
    {
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'object',
      fields: [
        {
          name: 'emergencyContact',
          title: 'Emergency Contact',
          type: 'string',
          description: 'Emergency contact information'
        },
        {
          name: 'specialInstructions',
          title: 'Special Instructions',
          type: 'text',
          description: 'Any special instructions for visitors'
        },
        {
          name: 'parkingInfo',
          title: 'Parking Information',
          type: 'text',
          description: 'Parking details and instructions'
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
