// Content templates for quick content creation
export const contentTemplates = {
  room: {
    deluxe: {
      title: 'Deluxe Room',
      description: 'Spacious and elegantly appointed with modern amenities and stunning views. Perfect for both business and leisure travelers.',
      amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Daily Housekeeping'],
      pricing: { base: 250, currency: 'USD' },
      capacity: 2,
      size: '350 sq ft',
      bedType: 'King Bed',
      view: 'City View'
    },
    suite: {
      title: 'Executive Suite',
      description: 'Luxurious suite featuring separate living and sleeping areas, premium amenities, and panoramic views.',
      amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Daily Housekeeping', 'Concierge Service', 'Complimentary Breakfast'],
      pricing: { base: 450, currency: 'USD' },
      capacity: 4,
      size: '650 sq ft',
      bedType: 'King Bed + Sofa Bed',
      view: 'Ocean View'
    },
    presidential: {
      title: 'Presidential Suite',
      description: 'The ultimate in luxury accommodation with expansive living spaces, premium finishes, and exclusive amenities.',
      amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Daily Housekeeping', 'Concierge Service', 'Complimentary Breakfast', 'Private Butler', 'Spa Access'],
      pricing: { base: 800, currency: 'USD' },
      capacity: 6,
      size: '1200 sq ft',
      bedType: 'King Bed + Queen Bed',
      view: 'Panoramic Ocean View'
    }
  },
  
  dining: {
    fineDining: {
      title: 'Signature Restaurant',
      description: 'Award-winning fine dining experience featuring contemporary cuisine with locally sourced ingredients.',
      cuisine: 'Contemporary',
      priceRange: '$$$$',
      hours: '6:00 PM - 10:00 PM',
      location: 'Main Hotel Building, 2nd Floor',
      specialties: ['Seafood', 'Wine Pairing', 'Chef\'s Tasting Menu']
    },
    casual: {
      title: 'Garden Bistro',
      description: 'Relaxed dining in a beautiful garden setting with fresh, seasonal dishes and craft cocktails.',
      cuisine: 'Mediterranean',
      priceRange: '$$',
      hours: '7:00 AM - 11:00 PM',
      location: 'Garden Pavilion',
      specialties: ['Farm-to-Table', 'Craft Cocktails', 'Outdoor Seating']
    },
    poolside: {
      title: 'Poolside Bar & Grill',
      description: 'Casual poolside dining with refreshing drinks, light bites, and tropical vibes.',
      cuisine: 'Tropical Fusion',
      priceRange: '$$',
      hours: '11:00 AM - 8:00 PM',
      location: 'Infinity Pool Area',
      specialties: ['Fresh Juices', 'Grilled Seafood', 'Poolside Service']
    }
  },
  
  amenity: {
    spa: {
      title: 'Luxury Spa & Wellness Center',
      description: 'Rejuvenate your mind and body with our comprehensive spa services and wellness programs.',
      category: 'Wellness',
      hours: '8:00 AM - 10:00 PM',
      location: 'Spa Building, Ground Floor',
      pricing: 'Additional charges apply',
      features: ['Massage Therapy', 'Facials', 'Body Treatments', 'Sauna', 'Steam Room']
    },
    fitness: {
      title: 'State-of-the-Art Fitness Center',
      description: 'Stay active with our modern fitness equipment and personal training services.',
      category: 'Recreation',
      hours: '24/7',
      location: 'Main Hotel Building, Basement',
      pricing: 'Complimentary for guests',
      features: ['Cardio Equipment', 'Weight Training', 'Personal Training', 'Group Classes']
    },
    business: {
      title: 'Business Center',
      description: 'Professional meeting spaces and business services for corporate travelers.',
      category: 'Business',
      hours: '6:00 AM - 10:00 PM',
      location: 'Main Hotel Building, 3rd Floor',
      pricing: 'Complimentary for guests',
      features: ['Meeting Rooms', 'Printing Services', 'High-Speed Internet', 'Video Conferencing']
    }
  },
  
  page: {
    about: {
      title: 'About Our Hotel',
      intro: {
        title: 'Welcome to Paradise Hotel',
        subtitle: 'Where Luxury Meets Comfort',
        description: 'Discover our story of hospitality excellence and commitment to creating unforgettable experiences.'
      },
      sections: [
        {
          _type: 'textSection',
          heading: 'Our Story',
          content: [
            {
              _type: 'block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: 'Founded in 1995, Paradise Hotel has been a beacon of luxury hospitality for over 25 years. Our commitment to excellence and personalized service has made us a preferred destination for discerning travelers worldwide.'
                }
              ]
            }
          ]
        }
      ]
    },
    contact: {
      title: 'Contact Us',
      intro: {
        title: 'Get in Touch',
        subtitle: 'We\'re Here to Help',
        description: 'Have questions or need assistance? Our team is ready to help make your stay perfect.'
      },
      sections: [
        {
          _type: 'formSection',
          heading: 'Send us a Message',
          description: 'Fill out the form below and we\'ll get back to you within 24 hours.',
          formType: 'contact'
        }
      ]
    }
  }
}

// Helper function to get template by type and variant
export function getContentTemplate(type: string, variant: string) {
  return contentTemplates[type]?.[variant] || null
}

// Helper function to get all available templates for a content type
export function getAvailableTemplates(type: string) {
  return Object.keys(contentTemplates[type] || {})
}

// Helper function to apply template to content
export function applyTemplate(template: any, overrides: any = {}) {
  return {
    ...template,
    ...overrides,
    // Deep merge for nested objects
    pricing: template.pricing ? { ...template.pricing, ...overrides.pricing } : overrides.pricing,
    intro: template.intro ? { ...template.intro, ...overrides.intro } : overrides.intro
  }
}



