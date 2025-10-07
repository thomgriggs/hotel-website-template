export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text'
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image'
    },
    {
      name: 'logoWhite',
      title: 'White Logo (for footer)',
      type: 'image'
    },
    {
      name: 'navigation',
      title: 'Main Navigation Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Internal Page', value: 'internal' },
                  { title: 'External URL', value: 'external' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'internalUrl',
              title: 'Internal URL',
              type: 'string',
              hidden: ({ parent }) => parent?.linkType !== 'internal'
            },
            {
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              hidden: ({ parent }) => parent?.linkType !== 'external'
            },
            {
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              hidden: ({ parent }) => parent?.linkType !== 'external'
            }
          ]
        }
      ]
    },
    {
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Internal Page', value: 'internal' },
                  { title: 'External URL', value: 'external' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'internalUrl',
              title: 'Internal URL',
              type: 'string',
              hidden: ({ parent }) => parent?.linkType !== 'internal'
            },
            {
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              hidden: ({ parent }) => parent?.linkType !== 'external'
            },
            {
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              hidden: ({ parent }) => parent?.linkType !== 'external'
            }
          ]
        }
      ]
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Pinterest', value: 'pinterest' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: Rule => Rule.required()
            },
            {
              name: 'showText',
              title: 'Show Text Label',
              type: 'boolean',
              initialValue: true,
              description: 'Whether to show the platform name as text or just the icon'
            },
            {
              name: 'customIcon',
              title: 'Custom Icon',
              type: 'image',
              description: 'Upload a custom icon (optional). If not provided, will use default platform icon.'
            },
            {
              name: 'ariaLabel',
              title: 'Accessibility Label',
              type: 'string',
              description: 'Custom label for screen readers (optional)'
            }
          ]
        }
      ]
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Address',
          type: 'array',
          of: [{ type: 'string' }]
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string'
        }
      ]
    },
    {
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Internal Page', value: 'internal' },
                  { title: 'External URL', value: 'external' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'internalUrl',
              title: 'Internal URL',
              type: 'string',
              hidden: ({ parent }) => parent?.linkType !== 'internal'
            },
            {
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              hidden: ({ parent }) => parent?.linkType !== 'external'
            },
            {
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              hidden: ({ parent }) => parent?.linkType !== 'external'
            }
          ]
        }
      ]
    }
  ]
}