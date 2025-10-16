import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'hotel-website',
  title: 'Hotel Website CMS',
  projectId: '0knotzp4',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Content Management
            S.listItem()
              .title('Pages')
              .child(
                S.documentTypeList('homepage')
                  .title('Pages')
                  .filter('_type == "homepage"')
              ),
            S.listItem()
              .title('Rooms')
              .child(
                S.documentTypeList('room')
                  .title('Rooms')
                  .filter('_type == "room"')
              ),
            S.listItem()
              .title('Dining')
              .child(
                S.documentTypeList('dining')
                  .title('Dining')
                  .filter('_type == "dining"')
              ),
            S.listItem()
              .title('Amenities')
              .child(
                S.documentTypeList('amenity')
                  .title('Amenities')
                  .filter('_type == "amenity"')
              ),
            
            // Content Templates
            S.listItem()
              .title('Content Templates')
              .child(
                S.documentTypeList('contentTemplate')
                  .title('Content Templates')
                  .filter('_type == "contentTemplate"')
              ),
            
            // Settings
            S.listItem()
              .title('Site Settings')
              .child(
                S.documentTypeList('siteSettings')
                  .title('Site Settings')
                  .filter('_type == "siteSettings"')
              ),
            
            // All other content types
            ...S.documentTypeListItems().filter(
              listItem => !['homepage', 'room', 'dining', 'amenity', 'contentTemplate', 'siteSettings'].includes(listItem.getId() || '')
            )
          ])
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})