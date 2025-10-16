import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'skTgX04FcukL6ovhMe8qGUtUmiUIdPH0pLxiFuFWeCLts4fkrVb2dp8t0OU4PObdTeMmxzEnpQ0ckQiqq7v4Q4NkgiBvU8JSGxSZCDZIqHWRcfYZmWmZVV6DIXqIp5vdfjv0tLpi9mJEbhKeXpOsq0yJiwptMZHiuQ93rTjTGUSc0SvEU40v'
});

const siteSettingsData = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  title: 'Paradise Hotel',
  description: 'Experience luxury and comfort at Paradise Hotel, where every detail is crafted for your perfect stay.',
  siteName: 'Paradise Hotel', // Legacy field
  siteDescription: 'Experience luxury and comfort at Paradise Hotel, where every detail is crafted for your perfect stay.', // Legacy field
  
  // Navigation Menu
  navigation: [
    {
      _type: 'navigationItem',
      label: 'Home',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/'
    },
    {
      _type: 'navigationItem',
      label: 'Rooms',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/rooms'
    },
    {
      _type: 'navigationItem',
      label: 'Dining',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/dining'
    },
    {
      _type: 'navigationItem',
      label: 'Amenities',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/amenities'
    },
    {
      _type: 'navigationItem',
      label: 'Location',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/location'
    },
    {
      _type: 'navigationItem',
      label: 'Contact',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/contact'
    }
  ],

  // Footer Menu
  footerMenu: [
    {
      _type: 'navigationItem',
      label: 'Privacy Policy',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/privacy'
    },
    {
      _type: 'navigationItem',
      label: 'Terms of Service',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/terms'
    },
    {
      _type: 'navigationItem',
      label: 'Newsletter',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/newsletter'
    }
  ],

  // Social Media Links
  socialLinks: [
    {
      _type: 'object',
      platform: 'facebook',
      url: 'https://facebook.com/paradisehotel',
      showText: true
    },
    {
      _type: 'object',
      platform: 'instagram',
      url: 'https://instagram.com/paradisehotel',
      showText: true
    },
    {
      _type: 'object',
      platform: 'twitter',
      url: 'https://twitter.com/paradisehotel',
      showText: true
    }
  ],

  // Contact Information
  contactInfo: {
    _type: 'object',
    address: [
      '123 Paradise Drive',
      'Paradise City, PC 90210',
      'United States'
    ],
    phone: '+1 (555) 123-4567',
    email: 'info@paradisehotel.com'
  },

  // Legal Links
  legalLinks: [
    {
      _type: 'navigationItem',
      label: 'Privacy Policy',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/privacy'
    },
    {
      _type: 'navigationItem',
      label: 'Terms of Use',
      linkType: 'internal',
      pageType: 'main',
      mainPage: '/terms'
    }
  ],

  // SEO Settings
  seoSettings: {
    _type: 'object',
    defaultMetaTitle: 'Paradise Hotel - Luxury Accommodations & World-Class Service',
    defaultMetaDescription: 'Experience unparalleled luxury at Paradise Hotel. Premium accommodations, fine dining, and exceptional service in the heart of Paradise City.',
    keywords: [
      'luxury hotel',
      'paradise hotel',
      'accommodations',
      'fine dining',
      'spa services',
      'business travel',
      'vacation',
      'resort'
    ]
  }
};

async function createSiteSettings() {
  try {
    console.log('Creating siteSettings document...');
    
    // Check if document already exists
    const existingDoc = await client.getDocument('siteSettings');
    if (existingDoc) {
      console.log('siteSettings document already exists. Updating...');
      const result = await client.createOrReplace(siteSettingsData);
      console.log('✅ siteSettings document updated successfully!');
      console.log('Document ID:', result._id);
    } else {
      console.log('Creating new siteSettings document...');
      const result = await client.create(siteSettingsData);
      console.log('✅ siteSettings document created successfully!');
      console.log('Document ID:', result._id);
    }
    
    // Publish the document
    console.log('Publishing siteSettings document...');
    await client.patch('siteSettings').set({}).commit();
    console.log('✅ siteSettings document published!');
    
  } catch (error) {
    console.error('❌ Error creating siteSettings document:', error);
  }
}

createSiteSettings();
