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
            
            // Settings
            S.listItem()
              .title('Site Settings')
              .child(
                S.documentTypeList('siteSettings')
                  .title('Site Settings')
                  .filter('_type == "siteSettings"')
              )
          ])
    }),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})