export default {
  name: 'popoverSection',
  title: 'Popover Section',
  type: 'object',
  fields: [
    {
      name: 'triggerText',
      title: 'Trigger Text/Button',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Text that will trigger the popover'
    },
    {
      name: 'popoverContent',
      title: 'Popover Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'position',
      title: 'Popover Position',
      type: 'string',
      options: {
        list: [
          { title: 'Auto', value: 'auto' },
          { title: 'Top', value: 'top' },
          { title: 'Bottom', value: 'bottom' },
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' }
        ]
      },
      initialValue: 'auto'
    },
    {
      name: 'animation',
      title: 'Animation',
      type: 'string',
      options: {
        list: [
          { title: 'Fade', value: 'fade' },
          { title: 'Slide Down', value: 'slide-down' },
          { title: 'Scale', value: 'scale' },
          { title: 'None', value: 'none' }
        ]
      },
      initialValue: 'fade'
    },
    {
      name: 'triggerStyle',
      title: 'Trigger Style',
      type: 'string',
      options: {
        list: [
          { title: 'Button', value: 'button' },
          { title: 'Link', value: 'link' },
          { title: 'Text', value: 'text' },
          { title: 'Icon', value: 'icon' }
        ]
      },
      initialValue: 'button'
    },
    {
      name: 'closeOnOutsideClick',
      title: 'Close on Outside Click',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'closeOnEscape',
      title: 'Close on Escape Key',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'triggerText',
      subtitle: 'position'
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || 'Popover Section',
        subtitle: `Position: ${subtitle || 'auto'}`
      };
    }
  }
}




