import {defineConfig} from 'sanity'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Hotel Website CMS',
  projectId: '0knotzp4',
  dataset: 'production',
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: () => null,
    },
  },
})