export default {
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Menu Text',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'The text that will appear in the navigation'
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
      validation: Rule => Rule.required(),
      initialValue: 'internal'
    },
    {
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Main Page', value: 'main' },
          { title: 'Specific Room', value: 'room' },
          { title: 'Specific Restaurant', value: 'restaurant' },
          { title: 'Specific Amenity', value: 'amenity' }
        ]
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      initialValue: 'main',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainPage',
      title: 'Select Main Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: '/' },
          { title: 'Rooms', value: '/rooms' },
          { title: 'Dining', value: '/dining' },
          { title: 'Amenities', value: '/amenities' },
          { title: 'Location', value: '/location' },
          { title: 'Contact', value: '/contact' },
          { title: 'Terms of Use', value: '/terms' },
          { title: 'Privacy Policy', value: '/privacy' }
        ]
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal' || parent?.pageType !== 'main',
      validation: Rule => Rule.custom((value, context) => {
        const parent = context.parent as any;
        if (parent?.linkType === 'internal' && parent?.pageType === 'main' && !value) {
          return 'Please select a main page';
        }
        return true;
      })
    },
    {
      name: 'roomSlug',
      title: 'Select Room',
      type: 'string',
      options: {
        list: [
          { title: 'Junior Suite', value: 'junior-suite' },
          { title: 'Classic Room', value: 'classic-room' },
          { title: 'Deluxe Suite', value: 'deluxe-suite' },
          { title: 'Presidential Suite', value: 'presidential-suite' }
        ]
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal' || parent?.pageType !== 'room',
      validation: Rule => Rule.custom((value, context) => {
        const parent = context.parent as any;
        if (parent?.linkType === 'internal' && parent?.pageType === 'room' && !value) {
          return 'Please select a room';
        }
        return true;
      })
    },
    {
      name: 'restaurantSlug',
      title: 'Select Restaurant',
      type: 'string',
      options: {
        list: [
          { title: 'The Grand Dining Room', value: 'grand-dining-room' },
          { title: 'Ocean View Bistro', value: 'ocean-view-bistro' },
          { title: 'Poolside Bar & Grill', value: 'poolside-bar-grill' },
          { title: 'Rooftop Lounge', value: 'rooftop-lounge' }
        ]
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal' || parent?.pageType !== 'restaurant',
      validation: Rule => Rule.custom((value, context) => {
        const parent = context.parent as any;
        if (parent?.linkType === 'internal' && parent?.pageType === 'restaurant' && !value) {
          return 'Please select a restaurant';
        }
        return true;
      })
    },
    {
      name: 'amenitySlug',
      title: 'Select Amenity',
      type: 'string',
      options: {
        list: [
          { title: 'Spa & Wellness Center', value: 'spa-wellness-center' },
          { title: 'Fitness Center', value: 'fitness-center' },
          { title: 'Infinity Pool', value: 'infinity-pool' },
          { title: 'Business Center', value: 'business-center' },
          { title: 'Concierge Services', value: 'concierge-services' }
        ]
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal' || parent?.pageType !== 'amenity',
      validation: Rule => Rule.custom((value, context) => {
        const parent = context.parent as any;
        if (parent?.linkType === 'internal' && parent?.pageType === 'amenity' && !value) {
          return 'Please select an amenity';
        }
        return true;
      })
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: Rule => Rule.custom((value, context) => {
        const parent = context.parent as any;
        if (parent?.linkType === 'external' && !value) {
          return 'Please enter an external URL';
        }
        return true;
      })
    },
    {
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      pageType: 'pageType',
      mainPage: 'mainPage',
      roomSlug: 'roomSlug',
      restaurantSlug: 'restaurantSlug',
      amenitySlug: 'amenitySlug',
      externalUrl: 'externalUrl'
    },
    prepare(selection) {
      const { title, linkType, pageType, mainPage, roomSlug, restaurantSlug, amenitySlug, externalUrl } = selection;
      
      let url = '';
      if (linkType === 'external') {
        url = externalUrl;
      } else {
        switch (pageType) {
          case 'main':
            url = mainPage;
            break;
          case 'room':
            url = `/rooms/${roomSlug}`;
            break;
          case 'restaurant':
            url = `/dining/${restaurantSlug}`;
            break;
          case 'amenity':
            url = `/amenities/${amenitySlug}`;
            break;
        }
      }
      
      return {
        title: title,
        subtitle: `${linkType === 'internal' ? 'Internal' : 'External'}: ${url || 'No URL set'}`
      };
    }
  }
}


