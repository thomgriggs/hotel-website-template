import { client } from './sanity'

// Content templates to populate
const templates = [
  {
    _type: 'contentTemplate',
    name: 'Deluxe Room Template',
    description: 'Standard deluxe room with modern amenities',
    contentType: 'room',
    templateData: {
      title: 'Deluxe Room',
      description: 'Spacious and elegantly appointed with modern amenities and stunning views. Perfect for both business and leisure travelers.',
      amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Daily Housekeeping'],
      pricing: { base: 250, currency: 'USD' },
      capacity: 2,
      size: '350 sq ft',
      bedType: 'King Bed',
      view: 'City View'
    },
    isActive: true,
    sortOrder: 1
  },
  {
    _type: 'contentTemplate',
    name: 'Executive Suite Template',
    description: 'Luxurious suite with separate living areas',
    contentType: 'room',
    templateData: {
      title: 'Executive Suite',
      description: 'Luxurious suite featuring separate living and sleeping areas, premium amenities, and panoramic views.',
      amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Daily Housekeeping', 'Concierge Service', 'Complimentary Breakfast'],
      pricing: { base: 450, currency: 'USD' },
      capacity: 4,
      size: '650 sq ft',
      bedType: 'King Bed + Sofa Bed',
      view: 'Ocean View'
    },
    isActive: true,
    sortOrder: 2
  },
  {
    _type: 'contentTemplate',
    name: 'Fine Dining Restaurant Template',
    description: 'Award-winning fine dining experience',
    contentType: 'dining',
    templateData: {
      title: 'Signature Restaurant',
      description: 'Award-winning fine dining experience featuring contemporary cuisine with locally sourced ingredients.',
      cuisine: 'Contemporary',
      priceRange: '$$$$',
      hours: '6:00 PM - 10:00 PM',
      location: 'Main Hotel Building, 2nd Floor',
      features: ['Seafood', 'Wine Pairing', 'Chef\'s Tasting Menu']
    },
    isActive: true,
    sortOrder: 3
  },
  {
    _type: 'contentTemplate',
    name: 'Spa & Wellness Template',
    description: 'Comprehensive spa and wellness services',
    contentType: 'amenity',
    templateData: {
      title: 'Luxury Spa & Wellness Center',
      description: 'Rejuvenate your mind and body with our comprehensive spa services and wellness programs.',
      category: 'Wellness',
      hours: '8:00 AM - 10:00 PM',
      location: 'Spa Building, Ground Floor',
      pricing: 'Additional charges apply',
      features: ['Massage Therapy', 'Facials', 'Body Treatments', 'Sauna', 'Steam Room']
    },
    isActive: true,
    sortOrder: 4
  }
]

async function populateContentTemplates() {
  try {
    console.log('Creating content templates...')
    
    for (const template of templates) {
      const result = await client.create(template)
      console.log(`Created template: ${template.name} (${result._id})`)
    }
    
    console.log('✅ Content templates created successfully!')
  } catch (error) {
    console.error('❌ Error creating content templates:', error)
  }
}

// Run the script
populateContentTemplates()



