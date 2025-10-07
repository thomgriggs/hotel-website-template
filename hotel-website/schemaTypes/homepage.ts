import { defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'The title that appears in the browser tab (e.g., "Home - Paradise Hotel")'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Text that appears above the main title (e.g., "Welcome to")'
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main title on the homepage'
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Background image for the hero section'
    },
    {
      name: 'mainHeading',
      title: 'Main Content Heading',
      type: 'string',
      description: 'Heading for the main content section'
    },
    {
      name: 'mainDescription',
      title: 'Main Content Description',
      type: 'text',
      description: 'Description text for the main content section'
    },
    {
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
      description: 'Text for the primary call-to-action button'
    },
    {
      name: 'primaryButtonUrl',
      title: 'Primary Button URL',
      type: 'string',
      description: 'URL for the primary button'
    },
    {
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
      description: 'Text for the secondary call-to-action button'
    },
    {
      name: 'secondaryButtonUrl',
      title: 'Secondary Button URL',
      type: 'string',
      description: 'URL for the secondary button'
    },
    {
      name: 'roomsSectionTitle',
      title: 'Rooms Section Title',
      type: 'string',
      description: 'Title for the featured rooms section'
    },
    {
      name: 'diningSectionTitle',
      title: 'Dining Section Title',
      type: 'string',
      description: 'Title for the featured dining section'
    },
    {
      name: 'amenitiesSectionTitle',
      title: 'Amenities Section Title',
      type: 'string',
      description: 'Title for the featured amenities section'
    }
  ],
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'pageTitle'
    }
  }
})
