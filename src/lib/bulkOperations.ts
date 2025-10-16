import { client } from './sanity'

// Bulk operations for content management
export class BulkOperations {
  // Bulk update rooms
  static async bulkUpdateRooms(roomIds: string[], updates: any) {
    try {
      const patches = roomIds.map(id => 
        client.patch(id).set(updates)
      )
      
      const results = await Promise.all(patches.map(patch => patch.commit()))
      return { success: true, results }
    } catch (error) {
      console.error('Bulk update rooms failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Bulk publish documents
  static async bulkPublish(documentIds: string[]) {
    try {
      const patches = documentIds.map(id => 
        client.patch(id).set({ _rev: undefined })
      )
      
      const results = await Promise.all(patches.map(patch => patch.commit()))
      return { success: true, results }
    } catch (error) {
      console.error('Bulk publish failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Bulk unpublish documents
  static async bulkUnpublish(documentIds: string[]) {
    try {
      const patches = documentIds.map(id => 
        client.patch(id).set({ _rev: undefined })
      )
      
      const results = await Promise.all(patches.map(patch => patch.commit()))
      return { success: true, results }
    } catch (error) {
      console.error('Bulk unpublish failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Bulk delete documents
  static async bulkDelete(documentIds: string[]) {
    try {
      const results = await Promise.all(
        documentIds.map(id => client.delete(id))
      )
      return { success: true, results }
    } catch (error) {
      console.error('Bulk delete failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Bulk duplicate documents
  static async bulkDuplicate(documentIds: string[], newTitles: string[] = []) {
    try {
      const results = await Promise.all(
        documentIds.map(async (id, index) => {
          const doc = await client.getDocument(id)
          const newTitle = newTitles[index] || `${doc.title} (Copy)`
          
          return client.create({
            ...doc,
            _id: undefined,
            title: newTitle,
            slug: {
              current: `${doc.slug?.current || 'untitled'}-copy-${Date.now()}`
            }
          })
        })
      )
      return { success: true, results }
    } catch (error) {
      console.error('Bulk duplicate failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Bulk update pricing
  static async bulkUpdatePricing(documentIds: string[], priceUpdate: any) {
    try {
      const patches = documentIds.map(id => 
        client.patch(id).set({
          pricing: {
            base: priceUpdate.base,
            currency: priceUpdate.currency || 'USD'
          }
        })
      )
      
      const results = await Promise.all(patches.map(patch => patch.commit()))
      return { success: true, results }
    } catch (error) {
      console.error('Bulk update pricing failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Bulk update status
  static async bulkUpdateStatus(documentIds: string[], status: string) {
    try {
      const patches = documentIds.map(id => 
        client.patch(id).set({ status })
      )
      
      const results = await Promise.all(patches.map(patch => patch.commit()))
      return { success: true, results }
    } catch (error) {
      console.error('Bulk update status failed:', error)
      return { success: false, error: error.message }
    }
  }

  // Get bulk operation progress
  static async getBulkOperationProgress(operationId: string) {
    // This would integrate with a job queue system
    // For now, return a mock progress
    return {
      operationId,
      status: 'completed',
      progress: 100,
      processed: 10,
      total: 10,
      errors: []
    }
  }
}

// Content suggestions and auto-complete
export class ContentSuggestions {
  // Get content suggestions for a field
  static async getFieldSuggestions(fieldType: string, query: string = '') {
    try {
      const suggestions = await client.fetch(`
        *[_type == "${fieldType}" && title match "*${query}*"] | order(_createdAt desc) [0...5] {
          _id,
          title,
          slug,
          _createdAt
        }
      `)
      return suggestions
    } catch (error) {
      console.error('Get field suggestions failed:', error)
      return []
    }
  }

  // Get related content
  static async getRelatedContent(documentId: string, contentType: string) {
    try {
      const currentDoc = await client.getDocument(documentId)
      const related = await client.fetch(`
        *[_type == "${contentType}" && _id != $id] | order(_createdAt desc) [0...3] {
          _id,
          title,
          slug,
          image
        }
      `, { id: documentId })
      
      return related
    } catch (error) {
      console.error('Get related content failed:', error)
      return []
    }
  }

  // Get popular content
  static async getPopularContent(contentType: string, limit: number = 5) {
    try {
      const popular = await client.fetch(`
        *[_type == "${contentType}" && defined(featured) && featured == true] | order(_createdAt desc) [0...${limit}] {
          _id,
          title,
          slug,
          image,
          _createdAt
        }
      `)
      return popular
    } catch (error) {
      console.error('Get popular content failed:', error)
      return []
    }
  }

  // Get content analytics
  static async getContentAnalytics(contentType: string) {
    try {
      const analytics = await client.fetch(`
        {
          "total": count(*[_type == "${contentType}"]),
          "published": count(*[_type == "${contentType}" && defined(_rev)]),
          "drafts": count(*[_type == "${contentType}" && !defined(_rev)]),
          "featured": count(*[_type == "${contentType}" && featured == true]),
          "recent": *[_type == "${contentType}"] | order(_createdAt desc) [0...5] {
            _id,
            title,
            _createdAt,
            _updatedAt
          }
        }
      `)
      return analytics
    } catch (error) {
      console.error('Get content analytics failed:', error)
      return null
    }
  }
}



