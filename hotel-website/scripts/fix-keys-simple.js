#!/usr/bin/env node

// Simple script to fix missing _key properties using Sanity CLI
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03'
})

async function fixKeys() {
  console.log('🔧 Fixing missing _key properties...')
  
  try {
    // Get all documents that might have array fields
    const docs = await client.fetch(`
      *[_type in ["homepage", "roomsOverview", "diningOverview", "amenitiesOverview", 
                   "eventsOverview", "servicesOverview", "galleryOverview", 
                   "contact", "location", "termsOfUse", "privacyPolicy", 
                   "aboutUs", "newsletterSignup", "siteSettings"]] {
        _id,
        _type,
        title,
        pageTitle,
        sections,
        description,
        navigation,
        footerMenu,
        socialLinks,
        legalLinks
      }
    `)

    console.log(`Found ${docs.length} documents to check`)

    for (const doc of docs) {
      const updates = {}
      let needsUpdate = false

      // Helper function to add keys to arrays
      function addKeysToArray(array, keyPrefix) {
        if (!Array.isArray(array)) return array
        
        return array.map((item, index) => {
          if (!item._key) {
            needsUpdate = true
            return {
              ...item,
              _key: `${keyPrefix}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
            }
          }
          return item
        })
      }

      // Fix sections array
      if (doc.sections) {
        updates.sections = addKeysToArray(doc.sections, 'section')
      }

      // Fix description array
      if (doc.description) {
        updates.description = addKeysToArray(doc.description, 'desc')
      }

      // Fix navigation array
      if (doc.navigation) {
        updates.navigation = addKeysToArray(doc.navigation, 'nav')
      }

      // Fix footer menu array
      if (doc.footerMenu) {
        updates.footerMenu = addKeysToArray(doc.footerMenu, 'footer')
      }

      // Fix social links array
      if (doc.socialLinks) {
        updates.socialLinks = addKeysToArray(doc.socialLinks, 'social')
      }

      // Fix legal links array
      if (doc.legalLinks) {
        updates.legalLinks = addKeysToArray(doc.legalLinks, 'legal')
      }

      if (needsUpdate) {
        console.log(`Updating ${doc._type}: ${doc.title || doc.pageTitle || doc._id}`)
        await client.patch(doc._id).set(updates).commit()
        console.log(`✅ Fixed keys for ${doc._type}`)
      }
    }

    console.log('🎉 All missing keys have been fixed!')

  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n💡 Manual fix:')
    console.log('1. Go to Sanity Studio: http://localhost:3334/')
    console.log('2. Edit each document with missing keys')
    console.log('3. Save the document (keys will be auto-generated)')
  }
}

fixKeys()




