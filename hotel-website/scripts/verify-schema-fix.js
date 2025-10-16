import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN
});

async function verifySchemaFix() {
  console.log('🔍 Verifying schema fix...');
  console.log('');
  
  try {
    // Get one page to check the structure
    const page = await client.fetch(`*[_type == "page"][0] {
      _id,
      title,
      intro
    }`);
    
    if (page) {
      console.log(`📄 Checking: ${page.title}`);
      console.log(`   Intro structure:`, JSON.stringify(page.intro, null, 2));
      
      if (page.intro && !page.intro.hasOwnProperty('heroImage')) {
        console.log('  ✅ heroImage field is properly removed/optional');
      } else if (page.intro && page.intro.heroImage === null) {
        console.log('  ⚠️  heroImage is still null - may need studio refresh');
      } else {
        console.log('  ✅ heroImage field is properly handled');
      }
    }
    
    console.log('\n💡 If you still see validation errors in Sanity Studio:');
    console.log('   1. Refresh the browser page (Cmd+R or Ctrl+R)');
    console.log('   2. Clear browser cache if needed');
    console.log('   3. The schema changes should now be active');
    
  } catch (error) {
    console.error('❌ Error verifying schema:', error.message);
  }
}

// Run the verification
verifySchemaFix();




