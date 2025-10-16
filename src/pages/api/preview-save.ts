import type { APIRoute } from 'astro';
import { createClient } from '@sanity/client';

// Server-side Sanity client with write permissions
const writeClient = createClient({
  projectId: '0knotzp4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { documentId, fieldName, newValue, fieldType } = body;

    // Validate required fields
    if (!documentId || !fieldName || newValue === undefined) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: documentId, fieldName, newValue'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('API: Saving changes:', { documentId, fieldName, newValue, fieldType });

    // Build the patch operation
    const patch = writeClient.patch(documentId);
    
    // Handle different field types
    if (fieldType === 'button') {
      // For buttons, we need to update multiple fields
      await patch
        .set({ [`${fieldName}.text`]: newValue.text })
        .set({ [`${fieldName}.url`]: newValue.url })
        .set({ [`${fieldName}.target`]: newValue.target })
        .commit();
    } else if (fieldType === 'image') {
      // For images, update URL and alt text
      await patch
        .set({ [`${fieldName}.url`]: newValue.url })
        .set({ [`${fieldName}.alt`]: newValue.alt })
        .commit();
    } else if (fieldType === 'menu') {
      // For menu items, update text and URL
      await patch
        .set({ [`${fieldName}.text`]: newValue.text })
        .set({ [`${fieldName}.url`]: newValue.url })
        .commit();
    } else {
      // For simple fields, just set the value
      await patch.set({ [fieldName]: newValue }).commit();
    }

    console.log('API: Successfully saved changes');

    return new Response(JSON.stringify({
      success: true,
      message: 'Changes saved successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API: Error saving changes:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to save changes';
    
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
