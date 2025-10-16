import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'previewConfig',
  title: 'Preview Mode Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Name',
      type: 'string',
      initialValue: 'Preview Mode Settings',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief description of these preview mode settings',
    }),
    defineField({
      name: 'themeSettings',
      title: 'Theme Settings',
      type: 'object',
      fields: [
        defineField({
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
          description: 'Default theme for preview mode indicators and labels',
        }),
        defineField({
          name: 'autoDetect',
          title: 'Auto-detect Theme',
          type: 'boolean',
          initialValue: true,
          description: 'Automatically detect optimal theme based on background color',
        }),
        defineField({
          name: 'contrastThreshold',
          title: 'Contrast Threshold',
          type: 'number',
          initialValue: 0.5,
          min: 0,
          max: 1,
          step: 0.1,
          description: 'Threshold for determining light vs dark backgrounds (0-1)',
        }),
        defineField({
          name: 'customColors',
          title: 'Custom Color Overrides',
          type: 'object',
          fields: [
            defineField({
              name: 'primary',
              title: 'Primary Color',
              type: 'color',
              options: {
                disableAlpha: true,
              },
            }),
            defineField({
              name: 'primaryHover',
              title: 'Primary Hover Color',
              type: 'color',
              options: {
                disableAlpha: true,
              },
            }),
            defineField({
              name: 'background',
              title: 'Background Color',
              type: 'color',
              options: {
                disableAlpha: false,
              },
            }),
            defineField({
              name: 'text',
              title: 'Text Color',
              type: 'color',
              options: {
                disableAlpha: true,
              },
            }),
            defineField({
              name: 'border',
              title: 'Border Color',
              type: 'color',
              options: {
                disableAlpha: true,
              },
            }),
          ],
          description: 'Override default theme colors with custom values',
        }),
      ],
    }),
    defineField({
      name: 'iconSettings',
      title: 'Icon Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'defaultMappings',
          title: 'Default Icon Mappings',
          type: 'object',
          fields: [
            defineField({
              name: 'headline',
              title: 'Headline Icon',
              type: 'string',
              initialValue: 'type',
              description: 'Icon ID for headline content',
            }),
            defineField({
              name: 'paragraph',
              title: 'Paragraph Icon',
              type: 'string',
              initialValue: 'file-text',
              description: 'Icon ID for paragraph content',
            }),
            defineField({
              name: 'image',
              title: 'Image Icon',
              type: 'string',
              initialValue: 'image',
              description: 'Icon ID for image content',
            }),
            defineField({
              name: 'button',
              title: 'Button Icon',
              type: 'string',
              initialValue: 'link',
              description: 'Icon ID for button content',
            }),
            defineField({
              name: 'address',
              title: 'Address Icon',
              type: 'string',
              initialValue: 'map-pin',
              description: 'Icon ID for address content',
            }),
          ],
        }),
        defineField({
          name: 'showCustomIcons',
          title: 'Show Custom Icons',
          type: 'boolean',
          initialValue: true,
          description: 'Include custom uploaded icons in icon picker',
        }),
        defineField({
          name: 'iconSize',
          title: 'Icon Size',
          type: 'number',
          initialValue: 16,
          min: 12,
          max: 32,
          description: 'Default size for icons in preview mode (pixels)',
        }),
      ],
    }),
    defineField({
      name: 'previewSettings',
      title: 'Preview Mode Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'enablePreview',
          title: 'Enable Preview Mode',
          type: 'boolean',
          initialValue: true,
          description: 'Enable preview mode functionality',
        }),
        defineField({
          name: 'previewPassword',
          title: 'Preview Password',
          type: 'string',
          initialValue: 'edit2024',
          description: 'Password required to access preview mode',
        }),
        defineField({
          name: 'showLabels',
          title: 'Show Content Labels',
          type: 'boolean',
          initialValue: true,
          description: 'Show content type labels on hover',
        }),
        defineField({
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
          description: 'Position of content type labels',
        }),
        defineField({
          name: 'animationSpeed',
          title: 'Animation Speed',
          type: 'string',
          options: {
            list: [
              { title: 'Slow', value: 'slow' },
              { title: 'Normal', value: 'normal' },
              { title: 'Fast', value: 'fast' },
            ],
            layout: 'radio',
          },
          initialValue: 'normal',
          description: 'Speed of preview mode animations',
        }),
      ],
    }),
    defineField({
      name: 'accessibility',
      title: 'Accessibility Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'highContrast',
          title: 'High Contrast Mode',
          type: 'boolean',
          initialValue: false,
          description: 'Enable high contrast mode for better accessibility',
        }),
        defineField({
          name: 'reduceMotion',
          title: 'Reduce Motion',
          type: 'boolean',
          initialValue: false,
          description: 'Reduce animations for users with motion sensitivity',
        }),
        defineField({
          name: 'focusVisible',
          title: 'Enhanced Focus Indicators',
          type: 'boolean',
          initialValue: true,
          description: 'Show enhanced focus indicators for keyboard navigation',
        }),
      ],
    }),
    defineField({
      name: 'advanced',
      title: 'Advanced Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'debugMode',
          title: 'Debug Mode',
          type: 'boolean',
          initialValue: false,
          description: 'Enable debug logging for preview mode',
        }),
        defineField({
          name: 'customCSS',
          title: 'Custom CSS',
          type: 'text',
          rows: 10,
          description: 'Custom CSS to override preview mode styles',
        }),
        defineField({
          name: 'customJavaScript',
          title: 'Custom JavaScript',
          type: 'text',
          rows: 10,
          description: 'Custom JavaScript for advanced preview mode functionality',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      theme: 'themeSettings.defaultTheme',
    },
    prepare(selection) {
      const { title, subtitle, theme } = selection
      return {
        title: title || 'Preview Mode Configuration',
        subtitle: `${subtitle || 'Preview mode settings'} • Theme: ${theme || 'neutral'}`,
      }
    },
  },
})
