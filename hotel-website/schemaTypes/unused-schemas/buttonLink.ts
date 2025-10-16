export default {
  name: 'buttonLink',
  title: 'Button/Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Button Text',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'internalPage',
      title: 'Internal Page',
      type: 'reference',
      to: [
        { type: 'homepage' },
        { type: 'roomsOverview' },
        { type: 'diningOverview' },
        { type: 'amenitiesOverview' },
        { type: 'eventsOverview' },
        { type: 'servicesOverview' },
        { type: 'galleryOverview' },
        { type: 'contact' },
        { type: 'location' },
        { type: 'termsOfUse' },
        { type: 'privacyPolicy' },
        { type: 'aboutUs' },
        { type: 'newsletterSignup' },
        { type: 'room' },
        { type: 'dining' },
        { type: 'amenity' },
        { type: 'event' },
        { type: 'service' },
        { type: 'gallery' }
      ],
      description: 'Select an internal page from the dropdown'
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Enter a full URL (e.g., https://example.com)'
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      initialValue: false,
      description: 'Only applies to external links'
    }
  ],
  validation: Rule => Rule.custom((fields) => {
    if (!fields?.internalPage && !fields?.externalLink) {
      return 'Either an internal page or external link must be provided';
    }
    if (fields?.internalPage && fields?.externalLink) {
      return 'Cannot have both internal page and external link';
    }
    return true;
  }),
  preview: {
    select: {
      title: 'label',
      subtitle: 'internalPage.pageTitle',
      external: 'externalLink'
    },
    prepare(selection) {
      const { title, subtitle, external } = selection;
      return {
        title: title || 'Untitled Button',
        subtitle: subtitle || external || 'No link set'
      };
    }
  }
}




