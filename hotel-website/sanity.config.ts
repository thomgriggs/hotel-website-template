import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'hotel-website',
  title: 'Hotel Website CMS',
  projectId: '0knotzp4', // Correct project ID
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})