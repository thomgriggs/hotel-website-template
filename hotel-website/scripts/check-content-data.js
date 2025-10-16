import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN
});

async function checkContentData() {
  console.log('🔍 Checking content data...');
  console.log('');
  
  try {
    // Check rooms
    const rooms = await client.fetch(`*[_type == "room"] { _id, title, slug }`);
    console.log(`🏨 Rooms: ${rooms.length} found`);
    if (rooms.length === 0) {
      console.log('  ⚠️  No rooms found - postGridSection for rooms will be empty');
    }
    
    // Check dining
    const dining = await client.fetch(`*[_type == "dining"] { _id, title, slug }`);
    console.log(`🍽️  Dining: ${dining.length} found`);
    if (dining.length === 0) {
      console.log('  ⚠️  No restaurants found - postGridSection for dining will be empty');
    }
    
    // Check amenities
    const amenities = await client.fetch(`*[_type == "amenity"] { _id, title, slug }`);
    console.log(`🏊 Amenities: ${amenities.length} found`);
    if (amenities.length === 0) {
      console.log('  ⚠️  No amenities found - postGridSection for amenities will be empty');
    }
    
    console.log('');
    console.log('💡 The "invalid property value" errors are likely because:');
    console.log('   - PostGridSection components are trying to fetch empty data');
    console.log('   - Some sections might have missing required fields');
    console.log('');
    console.log('🔧 To fix this:');
    console.log('   1. Add some rooms, restaurants, and amenities in Sanity Studio');
    console.log('   2. Or modify the postGridSection to handle empty data gracefully');
    
  } catch (error) {
    console.error('❌ Error checking content:', error.message);
  }
}

// Run the script
checkContentData();




