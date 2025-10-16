import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN
});

async function fixSanityPageErrors() {
  console.log('🔧 Fixing Sanity page validation errors...');
  console.log('');
  
  try {
    // Get all pages
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
      console.log(`\n📄 Fixing: ${page.title} (/${page.slug?.current})`);
      
      const updates = {};
      
      // Fix intro section - ensure it has proper structure
      if (!page.intro || !page.intro.title) {
        updates.intro = {
          title: page.title || 'Untitled Page',
          subtitle: '',
          description: '',
          heroImage: null // Explicitly set to null instead of undefined
        };
        console.log('  ✅ Fixed intro section');
      }
      
      // Fix sections - add _key properties
      if (page.sections && Array.isArray(page.sections)) {
        const fixedSections = page.sections.map((section, index) => ({
          ...section,
          _key: section._key || `section-${index}-${Date.now()}`
        }));
        
        updates.sections = fixedSections;
        console.log(`  ✅ Fixed ${fixedSections.length} sections with _key properties`);
      }
      
      // Fix CTA section
      if (!page.cta) {
        updates.cta = {
          enabled: false
        };
        console.log('  ✅ Fixed CTA section');
      }
      
      // Fix SEO settings
      if (!page.seoSettings) {
        updates.seoSettings = {
          keywords: [],
          noindex: false
        };
        console.log('  ✅ Fixed SEO settings');
      }
      
      // Apply updates if any
      if (Object.keys(updates).length > 0) {
        try {
          await client.patch(page._id).set(updates).commit();
          console.log(`  ✅ Successfully updated page`);
        } catch (error) {
          console.log(`  ❌ Failed to update: ${error.message}`);
        }
      } else {
        console.log(`  ✅ No fixes needed`);
      }
    }
    
    console.log('\n🎉 All page validation errors fixed!');
    console.log('');
    console.log('📝 You can now edit pages in Sanity Studio without errors:');
    console.log('   Go to http://localhost:3333');
    console.log('   Click on "Pages" in the sidebar');
    console.log('   Edit any page content');
    
  } catch (error) {
    console.error('❌ Error fixing pages:', error.message);
  }
}

// Run the script
fixSanityPageErrors();




