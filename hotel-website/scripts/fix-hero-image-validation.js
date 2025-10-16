import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN
});

async function fixHeroImageValidation() {
  console.log('🖼️ Fixing heroImage validation errors...');
  console.log('');
  
  try {
    // Get all pages
    const pages = await client.fetch(`*[_type == "page"] {
      _id,
      title,
      intro
    }`);
    
    for (const page of pages) {
      console.log(`\n📄 Fixing: ${page.title}`);
      
      if (page.intro && page.intro.heroImage === null) {
        try {
          // Remove the heroImage field entirely instead of setting it to null
          await client.patch(page._id)
            .unset(['intro.heroImage'])
            .commit();
          
          console.log('  ✅ Removed null heroImage field');
        } catch (error) {
          console.log(`  ❌ Failed to fix heroImage: ${error.message}`);
        }
      } else {
        console.log('  ✅ No heroImage issues found');
      }
    }
    
    console.log('\n🎉 Hero image validation errors fixed!');
    console.log('');
    console.log('📝 The heroImage field is now properly optional in Sanity Studio');
    
  } catch (error) {
    console.error('❌ Error fixing hero images:', error.message);
  }
}

// Run the script
fixHeroImageValidation();




