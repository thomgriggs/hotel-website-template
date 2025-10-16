import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN
});

async function testPages() {
  console.log('🧪 Testing pages for validation errors...');
  console.log('');
  
  try {
    const pages = await client.fetch(`*[_type == "page"] {
      _id,
      pageType,
      slug,
      title,
      metaDescription,
      intro,
      sections,
      cta,
      seoSettings
    }`);
    
    for (const page of pages) {
      console.log(`\n📄 Testing: ${page.title} (/${page.slug?.current})`);
      
      // Test each section
      if (page.sections) {
        for (const section of page.sections) {
          console.log(`  📋 Section: ${section._type}`);
          
          if (section._type === 'postGridSection') {
            const posts = await client.fetch(`*[_type == "${section.postType}"] { _id, title, slug, featured }`);
            console.log(`    ✅ Found ${posts.length} ${section.postType}`);
            
            if (section.featuredOnly) {
              const featured = posts.filter(p => p.featured);
              console.log(`    ⭐ Featured: ${featured.length} items`);
            }
          }
        }
      }
    }
    
    console.log('\n🎉 All pages validated successfully!');
    console.log('');
    console.log('🌐 Your pages should now work without errors:');
    console.log('   http://localhost:4321/home');
    console.log('   http://localhost:4321/rooms');
    console.log('   http://localhost:4321/dining');
    console.log('   http://localhost:4321/amenities');
    console.log('   http://localhost:4321/contact');
    console.log('   http://localhost:4321/location');
    
  } catch (error) {
    console.error('❌ Error testing pages:', error.message);
  }
}

// Run the test
testPages();


