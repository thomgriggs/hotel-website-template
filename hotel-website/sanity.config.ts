import {defineConfig} from 'sanity'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'hotel-website',
  title: 'Hotel Website CMS',
  projectId: '0knotzp4',
  dataset: 'production',
  schema: {
    types: schemaTypes,
  },
})