export default {
  name: 'contentType',
  title: 'Content Types',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Content Type Name',
      type: 'string',
      description: 'Internal name (e.g., "events", "services")',
      validation: Rule => Rule.required().regex(/^[a-z][a-z0-9-]*$/, {
        name: 'slug',
        invert: false
      }).error('Must be lowercase letters, numbers, and hyphens only')
    },
    {
      name: 'title',
      title: 'Display Title',
      type: 'string',
      description: 'Display name (e.g., "Events", "Services")',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: '📋 Collection (Overview + Items)', value: 'collection' },
          { title: '📄 Standalone Page', value: 'standalone' },
          { title: '🏠 Mixed Content (Homepage-style)', value: 'mixed' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon for the content type',
      initialValue: '📄'
    },
    {
      name: 'urlPattern',
      title: 'URL Pattern',
      type: 'string',
      description: 'URL pattern (e.g., "/events", "/services")',
      validation: Rule => Rule.required().regex(/^\/[a-z0-9-]*$/, {
        name: 'url',
        invert: false
      }).error('Must start with / and contain only lowercase letters, numbers, and hyphens')
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of this content type'
    },
    {
      name: 'fields',
      title: 'Content Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'field',
          title: 'Field',
          fields: [
            {
              name: 'name',
              title: 'Field Name',
              type: 'string',
              description: 'Internal field name (e.g., "title", "description")',
              validation: Rule => Rule.required().regex(/^[a-z][a-z0-9]*$/, {
                name: 'fieldName',
                invert: false
              }).error('Must be lowercase letters and numbers only')
            },
            {
              name: 'title',
              title: 'Field Title',
              type: 'string',
              description: 'Display name (e.g., "Title", "Description")',
              validation: Rule => Rule.required()
            },
            {
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'string' },
                  { title: 'Long Text', value: 'text' },
                  { title: 'Rich Text', value: 'array' },
                  { title: 'Number', value: 'number' },
                  { title: 'Date/Time', value: 'datetime' },
                  { title: 'Image', value: 'image' },
                  { title: 'Boolean (Yes/No)', value: 'boolean' },
                  { title: 'URL', value: 'url' },
                  { title: 'Email', value: 'email' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'required',
              title: 'Required Field',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'description',
              title: 'Field Description',
              type: 'string',
              description: 'Help text for this field'
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'type',
              required: 'required'
            },
            prepare(selection) {
              const { title, subtitle, required } = selection;
              return {
                title: title,
                subtitle: `${subtitle}${required ? ' (required)' : ''}`
              };
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).error('At least one field is required')
    },
    {
      name: 'overviewPage',
      title: 'Overview Page Settings',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Overview Page',
          type: 'boolean',
          initialValue: true,
          hidden: ({ parent }) => parent?.parent?.type !== 'collection'
        },
        {
          name: 'title',
          title: 'Overview Page Title',
          type: 'string',
          hidden: ({ parent }) => !parent?.enabled || parent?.parent?.type !== 'collection'
        },
        {
          name: 'description',
          title: 'Overview Page Description',
          type: 'text',
          rows: 3,
          hidden: ({ parent }) => !parent?.enabled || parent?.parent?.type !== 'collection'
        },
        {
          name: 'sections',
          title: 'Overview Page Sections',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'section',
              title: 'Section',
              fields: [
                {
                  name: 'type',
                  title: 'Section Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: '📝 Text Section', value: 'text' },
                      { title: '🖼️ Image + Text', value: 'imageText' },
                      { title: '🖼️ Gallery', value: 'gallery' },
                      { title: '⭐ Testimonials', value: 'testimonials' },
                      { title: '🎯 Call to Action', value: 'cta' }
                    ]
                  }
                },
                {
                  name: 'heading',
                  title: 'Section Heading',
                  type: 'string'
                },
                {
                  name: 'content',
                  title: 'Section Content',
                  type: 'text',
                  rows: 4
                }
              ],
              preview: {
                select: {
                  title: 'heading',
                  subtitle: 'type'
                },
                prepare(selection) {
                  const { title, subtitle } = selection;
                  return {
                    title: title || 'Untitled Section',
                    subtitle: subtitle
                  };
                }
              }
            }
          ],
          hidden: ({ parent }) => !parent?.enabled || parent?.parent?.type !== 'collection'
        }
      ],
      hidden: ({ parent }) => parent?.type !== 'collection'
    },
    {
      name: 'navigation',
      title: 'Navigation Settings',
      type: 'object',
      fields: [
        {
          name: 'addToMainMenu',
          title: 'Add to Main Menu',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'addToFooter',
          title: 'Add to Footer',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'menuOrder',
          title: 'Menu Order',
          type: 'number',
          description: 'Order in navigation (lower numbers appear first)',
          initialValue: 100
        }
      ]
    },
    {
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'defaultKeywords',
          title: 'Default SEO Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'defaultMetaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 2,
          validation: Rule => Rule.max(160)
        }
      ]
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Active', value: 'active' },
          { title: '🟡 Draft', value: 'draft' },
          { title: '🔴 Disabled', value: 'disabled' }
        ]
      },
      initialValue: 'active'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      icon: 'icon',
      status: 'status'
    },
    prepare(selection) {
      const { title, subtitle, icon, status } = selection;
      const statusEmoji = {
        'active': '🟢',
        'draft': '🟡',
        'disabled': '🔴'
      };
      return {
        title: `${icon || '📄'} ${title}`,
        subtitle: `${subtitle} • ${statusEmoji[status] || '🟢'} ${status || 'active'}`
      };
    }
  }
}




