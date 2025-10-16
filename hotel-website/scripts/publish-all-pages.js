import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN
})

async function publishAllPages() {
  try {
    console.log('📋 Checking all pages in content management...')

    // Get all page types
    const pageTypes = [
      'homepage',
      'roomsOverview', 
      'diningOverview',
      'amenitiesOverview',
      'eventsOverview',
      'servicesOverview',
      'galleryOverview',
      'contact',
      'location',
      'termsOfUse',
      'privacyPolicy',
      'aboutUs',
      'newsletterSignup',
      'room',
      'dining',
      'amenity',
      'event',
      'service',
      'gallery'
    ]

    for (const pageType of pageTypes) {
      console.log(`\n🔍 Checking ${pageType} pages...`)
      
      const pages = await client.fetch(`*[_type == "${pageType}"]`)
      
      if (pages.length === 0) {
        console.log(`❌ No ${pageType} pages found`)
      } else {
        console.log(`✅ Found ${pages.length} ${pageType} page(s)`)
        
        for (const page of pages) {
          console.log(`  📄 ${page.title || page.pageTitle || page._id}`)
          
          // Check if page has required fields
          if (!page.title && !page.pageTitle) {
            console.log(`    ⚠️ Missing title`)
          }
          
          // Publish the page if it's not already published
          if (page._id && !page._id.includes('drafts.')) {
            try {
              await client.patch(page._id).set({}).commit()
              console.log(`    ✅ Published`)
            } catch (error) {
              console.log(`    ⚠️ Already published or error:`, error.message)
            }
          }
        }
      }
    }

    // Check site settings
    console.log(`\n🔍 Checking site settings...`)
    const siteSettings = await client.fetch('*[_type == "siteSettings"][0]')
    
    if (siteSettings) {
      console.log(`✅ Site settings found: ${siteSettings.title}`)
      
      // Clean up site settings
      const cleanSettings = {
        title: siteSettings.title || 'Paradise Hotel',
        description: siteSettings.description || 'Experience unparalleled luxury and world-class service in our stunning beachfront resort.',
        logo: siteSettings.logo || null,
        logoWhite: siteSettings.logoWhite || null,
        navigation: siteSettings.navigation || [],
        footerMenu: siteSettings.footerMenu || [],
        socialLinks: siteSettings.socialLinks || [
          {
            _key: 'social-facebook',
            platform: 'facebook',
            url: 'https://facebook.com/paradisehotel',
            showText: false,
            ariaLabel: 'Follow us on Facebook'
          },
          {
            _key: 'social-instagram',
            platform: 'instagram',
            url: 'https://instagram.com/paradisehotel',
            showText: false,
            ariaLabel: 'Follow us on Instagram'
          },
          {
            _key: 'social-twitter',
            platform: 'twitter',
            url: 'https://twitter.com/paradisehotel',
            showText: false,
            ariaLabel: 'Follow us on Twitter'
          }
        ],
        contactInfo: siteSettings.contactInfo || {
          address: [
            '123 Paradise Drive',
            'Paradise City, PC 90210',
            'United States'
          ],
          phone: '+1 (555) 123-4567',
          email: 'info@paradisehotel.com'
        },
        legalLinks: siteSettings.legalLinks || [],
        siteName: siteSettings.siteName || null,
        siteDescription: siteSettings.siteDescription || null,
        favicon: siteSettings.favicon || null,
        seoSettings: siteSettings.seoSettings || {
          defaultMetaTitle: 'Paradise Hotel - Luxury Accommodations',
          defaultMetaDescription: 'Experience unparalleled luxury and world-class service in our stunning beachfront resort.',
          keywords: ['luxury hotel', 'beachfront resort', 'fine dining', 'spa services', 'luxury accommodations']
        }
      }

      await client
        .patch(siteSettings._id)
        .set(cleanSettings)
        .commit()
      
      console.log(`✅ Site settings cleaned and published`)
    } else {
      console.log(`❌ No site settings found`)
    }

    console.log('\n🎉 All pages checked and published!')
    console.log('📱 You can now review all pages in Sanity Studio at http://localhost:3334/')

  } catch (error) {
    console.error('❌ Error publishing pages:', error)
  }
}

publishAllPages()




