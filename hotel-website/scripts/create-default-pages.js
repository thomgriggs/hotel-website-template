import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false, // Don't use CDN for mutations
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN // You'll need to set this
});

// Default pages to create
const defaultPages = [
  {
    pageType: 'homepage',
    slug: { current: 'home' },
    title: 'Welcome to Paradise Hotel',
    metaDescription: 'Experience luxury hospitality at Paradise Hotel. World-class accommodations, exceptional dining, and premium amenities in a stunning beachfront location.',
    intro: {
      title: 'Luxury Redefined',
      subtitle: 'Welcome to Paradise',
      description: 'Experience unparalleled luxury and world-class service in our stunning beachfront resort. From elegant accommodations to exceptional dining, every detail is crafted for your comfort.',
      heroImage: null // Will use fallback image
    },
    sections: [
      {
        _type: 'postGridSection',
        heading: 'Featured Rooms',
        postType: 'rooms',
        limit: 2,
        featuredOnly: true
      },
      {
        _type: 'postGridSection',
        heading: 'Exceptional Dining',
        postType: 'dining',
        limit: 2,
        featuredOnly: true
      },
      {
        _type: 'postGridSection',
        heading: 'World-Class Amenities',
        postType: 'amenities',
        limit: 2,
        featuredOnly: true
      }
    ],
    cta: {
      enabled: true,
      title: 'Ready to Experience Paradise?',
      description: 'Book your stay and discover luxury redefined.',
      primaryButton: {
        text: 'Book Now',
        url: '/contact'
      },
      secondaryButton: {
        text: 'View Rooms',
        url: '/rooms'
      }
    },
    seoSettings: {
      keywords: ['luxury hotel', 'beachfront resort', 'fine dining', 'spa', 'accommodations'],
      noindex: false
    }
  },
  {
    pageType: 'overview',
    slug: { current: 'rooms' },
    title: 'Our Rooms & Suites',
    metaDescription: 'Discover our luxury accommodations. From elegant suites to spacious rooms, each designed for ultimate comfort and relaxation.',
    intro: {
      title: 'Luxury Accommodations',
      subtitle: 'Our Rooms & Suites',
      description: 'Experience luxury and comfort in our beautifully appointed accommodations, each designed to provide the perfect retreat for your stay.',
      heroImage: null
    },
    sections: [
      {
        _type: 'postGridSection',
        heading: 'Available Rooms',
        postType: 'rooms',
        limit: 6,
        featuredOnly: false
      }
    ],
    cta: {
      enabled: true,
      title: 'Reserve Your Perfect Room',
      description: 'Find the ideal accommodation for your stay.',
      primaryButton: {
        text: 'Book Now',
        url: '/contact'
      },
      secondaryButton: {
        text: 'View Details',
        url: '/rooms'
      }
    },
    seoSettings: {
      keywords: ['luxury hotel rooms', 'hotel accommodations', 'luxury suites', 'hotel booking'],
      noindex: false
    }
  },
  {
    pageType: 'overview',
    slug: { current: 'dining' },
    title: 'Exceptional Dining',
    metaDescription: 'Indulge in world-class cuisine at our award-winning restaurants. From fine dining to casual fare, our culinary team creates unforgettable experiences.',
    intro: {
      title: 'Culinary Excellence',
      subtitle: 'Exceptional Dining',
      description: 'Indulge in world-class cuisine at our award-winning restaurants. From fine dining to casual fare, our culinary team creates unforgettable experiences.',
      heroImage: null
    },
    sections: [
      {
        _type: 'postGridSection',
        heading: 'Our Restaurants',
        postType: 'dining',
        limit: 6,
        featuredOnly: false
      }
    ],
    cta: {
      enabled: true,
      title: 'Make a Reservation',
      description: 'Experience our exceptional dining.',
      primaryButton: {
        text: 'Reserve Table',
        url: '/contact'
      },
      secondaryButton: {
        text: 'View Menus',
        url: '/dining'
      }
    },
    seoSettings: {
      keywords: ['hotel dining', 'restaurant', 'fine dining', 'culinary', 'reservations'],
      noindex: false
    }
  },
  {
    pageType: 'overview',
    slug: { current: 'amenities' },
    title: 'World-Class Amenities',
    metaDescription: 'Discover our comprehensive amenities including spa services, fitness center, infinity pool, and concierge services designed for your ultimate comfort.',
    intro: {
      title: 'Relax & Rejuvenate',
      subtitle: 'World-Class Amenities',
      description: 'Discover our comprehensive amenities including spa services, fitness center, infinity pool, and concierge services designed for your ultimate comfort.',
      heroImage: null
    },
    sections: [
      {
        _type: 'postGridSection',
        heading: 'Our Amenities',
        postType: 'amenities',
        limit: 6,
        featuredOnly: false
      }
    ],
    cta: {
      enabled: true,
      title: 'Book Services',
      description: 'Enhance your stay with our premium amenities.',
      primaryButton: {
        text: 'Book Services',
        url: '/contact'
      },
      secondaryButton: {
        text: 'Learn More',
        url: '/amenities'
      }
    },
    seoSettings: {
      keywords: ['hotel amenities', 'spa services', 'fitness center', 'pool', 'concierge'],
      noindex: false
    }
  },
  {
    pageType: 'content',
    slug: { current: 'contact' },
    title: 'Contact Us',
    metaDescription: 'Get in touch with Paradise Hotel. Contact us for reservations, inquiries, or to plan your perfect stay.',
    intro: {
      title: 'Get in Touch',
      subtitle: 'Contact Us',
      description: 'We\'re here to help make your stay perfect. Contact us for reservations, inquiries, or any assistance you need.',
      heroImage: null
    },
    sections: [
      {
        _type: 'formSection',
        heading: 'Send Us a Message',
        formType: 'contact',
        description: 'Fill out the form below and we\'ll get back to you as soon as possible.',
        successMessage: 'Thank you for your message! We\'ll get back to you soon.'
      },
      {
        _type: 'textSection',
        heading: 'Contact Information',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Phone: +1-555-PARADISE\nEmail: info@paradisehotel.com\nAddress: 123 Paradise Drive, Paradise City, PC 12345'
              }
            ]
          }
        ],
        layout: 'centered'
      }
    ],
    cta: {
      enabled: false
    },
    seoSettings: {
      keywords: ['hotel contact', 'reservations', 'inquiries', 'customer service'],
      noindex: false
    }
  },
  {
    pageType: 'content',
    slug: { current: 'location' },
    title: 'Location & Directions',
    metaDescription: 'Find Paradise Hotel. Located in the heart of paradise with easy access to beaches, attractions, and cultural sites.',
    intro: {
      title: 'Prime Location',
      subtitle: 'Find Us Here',
      description: 'Located in the heart of paradise with easy access to beaches, attractions, and cultural sites. Experience the best of both luxury and adventure.',
      heroImage: null
    },
    sections: [
      {
        _type: 'mapSection',
        heading: 'Interactive Map',
        latitude: 25.7617,
        longitude: -80.1918,
        zoom: 15,
        markerText: 'Paradise Hotel'
      },
      {
        _type: 'textSection',
        heading: 'Getting Here',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Paradise Hotel is conveniently located in the heart of Paradise City, just 15 minutes from the airport and 5 minutes from the beach. We offer complimentary shuttle service to and from the airport.'
              }
            ]
          }
        ],
        layout: 'centered'
      },
      {
        _type: 'textSection',
        heading: 'Parking',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Complimentary valet parking is available for all guests. Self-parking is also available in our secure underground garage.'
              }
            ]
          }
        ],
        layout: 'centered'
      }
    ],
    cta: {
      enabled: true,
      title: 'Get Directions',
      description: 'Plan your visit to Paradise Hotel.',
      primaryButton: {
        text: 'Get Directions',
        url: 'https://maps.google.com'
      },
      secondaryButton: {
        text: 'Book Now',
        url: '/contact'
      }
    },
    seoSettings: {
      keywords: ['hotel location', 'directions', 'parking', 'beachfront', 'airport'],
      noindex: false
    }
  }
];

async function createDefaultPages() {
  console.log('🚀 Creating default pages in Sanity...');
  console.log('');
  
  let createdCount = 0;
  let skippedCount = 0;
  
  for (const page of defaultPages) {
    try {
      // Check if page already exists
      const existingPage = await client.fetch(
        `*[_type == "page" && slug.current == $slug][0]`,
        { slug: page.slug.current }
      );
      
      if (existingPage) {
        console.log(`⏭️  Page "${page.title}" already exists, skipping...`);
        skippedCount++;
        continue;
      }
      
      // Create the page
      const result = await client.create({
        _type: 'page',
        ...page
      });
      
      console.log(`✅ Created page: ${page.title} (/${page.slug.current})`);
      createdCount++;
    } catch (error) {
      console.error(`❌ Error creating page "${page.title}":`, error.message);
    }
  }
  
  console.log('');
  console.log(`📊 Summary:`);
  console.log(`   ✅ Created: ${createdCount} pages`);
  console.log(`   ⏭️  Skipped: ${skippedCount} pages`);
  console.log('');
  
  if (createdCount > 0) {
    console.log('🎉 Default pages created successfully!');
    console.log('');
    console.log('🌐 You can now visit:');
    console.log('   http://localhost:4321/home');
    console.log('   http://localhost:4321/rooms');
    console.log('   http://localhost:4321/dining');
    console.log('   http://localhost:4321/amenities');
    console.log('   http://localhost:4321/contact');
    console.log('   http://localhost:4321/location');
    console.log('');
    console.log('📝 To edit content:');
    console.log('   Go to http://localhost:3333');
    console.log('   Click on "Pages" in the sidebar');
    console.log('   Edit any page content');
  } else {
    console.log('ℹ️  All pages already exist. No new pages created.');
  }
}

// Run the script
createDefaultPages().catch(console.error);