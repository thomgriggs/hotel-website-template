import { createClient } from '@sanity/client';

// Sanity client configuration
const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_TOKEN
});

async function checkAndFixPages() {
  console.log('🔍 Checking pages for validation errors...');
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
    
    console.log(`Found ${pages.length} pages:`);
    
    for (const page of pages) {
      console.log(`\n📄 ${page.title} (/${page.slug?.current || 'no-slug'})`);
      
      // Check for missing or invalid fields
      const issues = [];
      
      if (!page.pageType) issues.push('Missing pageType');
      if (!page.slug?.current) issues.push('Missing slug');
      if (!page.title) issues.push('Missing title');
      if (!page.intro) issues.push('Missing intro');
      if (!page.intro?.title) issues.push('Missing intro.title');
      
      if (issues.length > 0) {
        console.log(`  ❌ Issues: ${issues.join(', ')}`);
        
        // Try to fix common issues
        const updates = {};
        
        if (!page.intro) {
          updates.intro = {
            title: page.title || 'Untitled Page',
            subtitle: '',
            description: '',
            heroImage: null
          };
        }
        
        if (!page.sections) {
          updates.sections = [];
        }
        
        if (!page.cta) {
          updates.cta = {
            enabled: false
          };
        }
        
        if (!page.seoSettings) {
          updates.seoSettings = {
            keywords: [],
            noindex: false
          };
        }
        
        if (Object.keys(updates).length > 0) {
          try {
            await client.patch(page._id).set(updates).commit();
            console.log(`  ✅ Fixed: ${Object.keys(updates).join(', ')}`);
          } catch (error) {
            console.log(`  ❌ Failed to fix: ${error.message}`);
          }
        }
      } else {
        console.log(`  ✅ No issues found`);
      }
    }
    
    console.log('\n🎉 Page validation complete!');
    
  } catch (error) {
    console.error('❌ Error checking pages:', error.message);
  }
}

// Run the script
checkAndFixPages();


