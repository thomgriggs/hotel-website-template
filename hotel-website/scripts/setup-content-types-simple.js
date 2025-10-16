import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN
});

// Initial content types to create
const initialContentTypes = [
  {
    name: 'rooms',
    title: 'Rooms',
    type: 'collection',
    icon: '🏨',
    urlPattern: '/rooms',
    description: 'Hotel rooms and accommodations',
    fields: [
      {
        name: 'roomType',
        title: 'Room Type',
        type: 'string',
        required: true,
        description: 'Type of room (e.g., Suite, Standard, Deluxe)'
      },
      {
        name: 'capacity',
        title: 'Capacity',
        type: 'number',
        required: true,
        description: 'Maximum number of guests'
      },
      {
        name: 'price',
        title: 'Starting Price',
        type: 'number',
        required: false,
        description: 'Starting price per night'
      }
    ],
    overviewPage: {
      enabled: true,
      title: 'Luxury Accommodations',
      description: 'Experience luxury and comfort in our beautifully appointed accommodations.'
    },
    navigation: {
      addToMainMenu: true,
      addToFooter: true,
      menuOrder: 10
    },
    seoSettings: {
      defaultKeywords: ['luxury hotel rooms', 'hotel accommodations', 'luxury suites'],
      defaultMetaDescription: 'Discover our luxury accommodations designed for ultimate comfort.'
    }
  },
  {
    name: 'dining',
    title: 'Dining',
    type: 'collection',
    icon: '🍽️',
    urlPattern: '/dining',
    description: 'Restaurants and dining options',
    fields: [
      {
        name: 'cuisine',
        title: 'Cuisine Type',
        type: 'string',
        required: true,
        description: 'Type of cuisine (e.g., Fine Dining, Casual, Bar)'
      },
      {
        name: 'priceRange',
        title: 'Price Range',
        type: 'string',
        required: false,
        description: 'Price range (e.g., $$$, $$)'
      }
    ],
    overviewPage: {
      enabled: true,
      title: 'Exceptional Dining',
      description: 'Indulge in world-class cuisine at our award-winning restaurants.'
    },
    navigation: {
      addToMainMenu: true,
      addToFooter: true,
      menuOrder: 20
    },
    seoSettings: {
      defaultKeywords: ['hotel dining', 'restaurant', 'fine dining', 'culinary'],
      defaultMetaDescription: 'Indulge in world-class cuisine at our award-winning restaurants.'
    }
  },
  {
    name: 'amenities',
    title: 'Amenities',
    type: 'collection',
    icon: '🏊',
    urlPattern: '/amenities',
    description: 'Hotel amenities and services',
    fields: [
      {
        name: 'category',
        title: 'Amenity Category',
        type: 'string',
        required: true,
        description: 'Category of amenity (e.g., Spa, Fitness, Pool)'
      },
      {
        name: 'hours',
        title: 'Operating Hours',
        type: 'string',
        required: false,
        description: 'Amenity operating hours'
      }
    ],
    overviewPage: {
      enabled: true,
      title: 'World-Class Amenities',
      description: 'Discover our comprehensive amenities designed for your ultimate comfort.'
    },
    navigation: {
      addToMainMenu: true,
      addToFooter: true,
      menuOrder: 30
    },
    seoSettings: {
      defaultKeywords: ['hotel amenities', 'spa services', 'fitness center', 'pool'],
      defaultMetaDescription: 'Discover our comprehensive amenities designed for your ultimate comfort.'
    }
  },
  {
    name: 'contact',
    title: 'Contact',
    type: 'standalone',
    icon: '📞',
    urlPattern: '/contact',
    description: 'Contact information and form',
    fields: [
      {
        name: 'phone',
        title: 'Phone Number',
        type: 'string',
        required: true,
        description: 'Main contact phone number'
      },
      {
        name: 'email',
        title: 'Email Address',
        type: 'email',
        required: true,
        description: 'Main contact email'
      }
    ],
    navigation: {
      addToMainMenu: true,
      addToFooter: true,
      menuOrder: 40
    },
    seoSettings: {
      defaultKeywords: ['hotel contact', 'reservations', 'inquiries'],
      defaultMetaDescription: 'Get in touch with Paradise Hotel for reservations and inquiries.'
    }
  },
  {
    name: 'location',
    title: 'Location',
    type: 'standalone',
    icon: '📍',
    urlPattern: '/location',
    description: 'Hotel location and directions',
    fields: [
      {
        name: 'latitude',
        title: 'Latitude',
        type: 'number',
        required: true,
        description: 'Map latitude coordinate'
      },
      {
        name: 'longitude',
        title: 'Longitude',
        type: 'number',
        required: true,
        description: 'Map longitude coordinate'
      }
    ],
    navigation: {
      addToMainMenu: true,
      addToFooter: true,
      menuOrder: 50
    },
    seoSettings: {
      defaultKeywords: ['hotel location', 'directions', 'parking'],
      defaultMetaDescription: 'Find Paradise Hotel with easy access to beaches and attractions.'
    }
  }
];

async function setupInitialContentTypes() {
  console.log('🚀 Setting up initial content types...');
  console.log('');
  
  let createdCount = 0;
  let skippedCount = 0;
  
  for (const contentTypeData of initialContentTypes) {
    try {
      // Check if content type already exists
      const existingContentType = await client.fetch(
        `*[_type == "contentType" && name == $name][0]`,
        { name: contentTypeData.name }
      );
      
      if (existingContentType) {
        console.log(`⏭️  Content type "${contentTypeData.title}" already exists, skipping...`);
        skippedCount++;
        continue;
      }
      
      // Create the content type
      const contentType = await client.create({
        _type: 'contentType',
        ...contentTypeData,
        status: 'active'
      });
      
      console.log(`✅ Created content type: ${contentType.title}`);
      createdCount++;
      
    } catch (error) {
      console.error(`❌ Error creating content type "${contentTypeData.title}":`, error.message);
    }
  }
  
  console.log('');
  console.log(`📊 Summary:`);
  console.log(`   ✅ Created: ${createdCount} content types`);
  console.log(`   ⏭️  Skipped: ${skippedCount} content types`);
  console.log('');
  
  if (createdCount > 0) {
    console.log('🎉 Initial content types created successfully!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('   1. Go to Sanity Studio: http://localhost:3333');
    console.log('   2. You should see "Content Types" in the sidebar');
    console.log('   3. The system is ready for dynamic content management');
    console.log('');
    console.log('🌐 Content types created:');
    initialContentTypes.forEach(ct => {
      console.log(`   ${ct.icon} ${ct.title} (${ct.type}) - ${ct.urlPattern}`);
    });
  } else {
    console.log('ℹ️  All content types already exist. No new content types created.');
  }
}

// Run the setup
setupInitialContentTypes().catch(console.error);




