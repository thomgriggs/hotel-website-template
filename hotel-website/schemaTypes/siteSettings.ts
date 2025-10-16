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
      of: [{ type: 'navigationItem' }]
    },
    {
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'array',
      of: [{ type: 'navigationItem' }]
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
      of: [{ type: 'navigationItem' }]
    },
    {
      name: 'siteName',
      title: 'Site Name (Legacy)',
      type: 'string',
      description: 'Legacy field - use title instead'
    },
    {
      name: 'siteDescription',
      title: 'Site Description (Legacy)',
      type: 'text',
      description: 'Legacy field - use description instead'
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon icon'
    },
    {
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'defaultMetaTitle',
          title: 'Default Meta Title',
          type: 'string'
        },
        {
          name: 'defaultMetaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'keywords',
          title: 'Default Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        }
      ]
    },
    {
      name: 'previewModeConfig',
      title: 'Preview Mode Configuration',
      type: 'object',
      fields: [
        {
          name: 'enablePreview',
          title: 'Enable Preview Mode',
          type: 'boolean',
          initialValue: true,
          description: 'Enable preview mode functionality for content editing'
        },
        {
          name: 'previewPassword',
          title: 'Preview Password',
          type: 'string',
          initialValue: 'edit2024',
          description: 'Password required to access preview mode'
        },
        {
          name: 'defaultTheme',
          title: 'Default Theme',
          type: 'string',
          options: {
            list: [
              { title: 'Neutral', value: 'neutral' },
              { title: 'Warm', value: 'warm' },
              { title: 'Cool', value: 'cool' },
              { title: 'Professional', value: 'professional' },
            ],
            layout: 'radio',
          },
          initialValue: 'neutral',
          description: 'Default theme for preview mode indicators and labels'
        },
        {
          name: 'autoDetectTheme',
          title: 'Auto-detect Theme',
          type: 'boolean',
          initialValue: true,
          description: 'Automatically detect optimal theme based on background color'
        },
        {
          name: 'showContentLabels',
          title: 'Show Content Labels',
          type: 'boolean',
          initialValue: true,
          description: 'Show content type labels on hover'
        },
        {
          name: 'labelPosition',
          title: 'Label Position',
          type: 'string',
          options: {
            list: [
              { title: 'Top Left', value: 'top-left' },
              { title: 'Top Right', value: 'top-right' },
              { title: 'Bottom Left', value: 'bottom-left' },
              { title: 'Bottom Right', value: 'bottom-right' },
            ],
            layout: 'radio',
          },
          initialValue: 'top-left',
          description: 'Position of content type labels'
        },
        {
          name: 'customColors',
          title: 'Custom Colors',
          type: 'object',
          fields: [
            {
              name: 'primary',
              title: 'Primary Color',
              type: 'color',
              options: {
                disableAlpha: true,
              },
              description: 'Override default primary color'
            },
            {
              name: 'background',
              title: 'Background Color',
              type: 'color',
              options: {
                disableAlpha: false,
              },
              description: 'Override default background color'
            },
            {
              name: 'text',
              title: 'Text Color',
              type: 'color',
              options: {
                disableAlpha: true,
              },
              description: 'Override default text color'
            },
            {
              name: 'border',
              title: 'Border Color',
              type: 'color',
              options: {
                disableAlpha: true,
              },
              description: 'Override default border color'
            }
          ],
          description: 'Customize preview mode colors'
        },
        {
          name: 'iconSettings',
          title: 'Icon Settings',
          type: 'object',
          fields: [
            {
              name: 'showCustomIcons',
              title: 'Show Custom Icons',
              type: 'boolean',
              initialValue: true,
              description: 'Include custom uploaded icons in icon picker'
            },
            {
              name: 'iconSize',
              title: 'Icon Size',
              type: 'number',
              initialValue: 16,
              min: 12,
              max: 32,
              description: 'Default size for icons in preview mode (pixels)'
            },
            {
              name: 'defaultIcons',
              title: 'Default Icon Mappings',
              type: 'object',
              fields: [
                {
                  name: 'headline',
                  title: 'Headline Icon',
                  type: 'string',
                  initialValue: 'type',
                  description: 'Icon ID for headline content'
                },
                {
                  name: 'paragraph',
                  title: 'Paragraph Icon',
                  type: 'string',
                  initialValue: 'file-text',
                  description: 'Icon ID for paragraph content'
                },
                {
                  name: 'image',
                  title: 'Image Icon',
                  type: 'string',
                  initialValue: 'image',
                  description: 'Icon ID for image content'
                },
                {
                  name: 'button',
                  title: 'Button Icon',
                  type: 'string',
                  initialValue: 'link',
                  description: 'Icon ID for button content'
                },
                {
                  name: 'address',
                  title: 'Address Icon',
                  type: 'string',
                  initialValue: 'map-pin',
                  description: 'Icon ID for address content'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}