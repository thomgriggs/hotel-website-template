import React, { useEffect } from 'react'
import { VisualEditing } from '@sanity/visual-editing'

interface VisualEditingProviderProps {
  children: React.ReactNode
  zIndex?: number
}

export function VisualEditingProvider({ children, zIndex = 1000 }: VisualEditingProviderProps) {
  useEffect(() => {
    // Only load visual editing in preview mode
    const isPreview = window.location.search.includes('preview=true') || 
                     window.location.search.includes('preview=1')
    
    if (!isPreview) return

    // Initialize visual editing
    const visualEditing = new VisualEditing({
      zIndex,
      overlay: {
        enabled: true,
        showInspector: true,
        showToolbar: true,
      },
      // Customize the overlay appearance
      overlayStyles: {
        border: '2px solid #ff6b35',
        borderRadius: '4px',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
      }
    })

    return () => {
      visualEditing.destroy()
    }
  }, [zIndex])

  return <>{children}</>
}

// Component for inline editing buttons
export function InlineEditButton({ 
  documentId, 
  fieldPath, 
  children, 
  className = '' 
}: {
  documentId: string
  fieldPath: string
  children: React.ReactNode
  className?: string
}) {
  const isPreview = typeof window !== 'undefined' && 
    (window.location.search.includes('preview=true') || 
     window.location.search.includes('preview=1'))

  if (!isPreview) {
    return <>{children}</>
  }

  return (
    <div 
      className={`inline-edit-button ${className}`}
      data-sanity-edit-button={`${documentId}#${fieldPath}`}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.1)'
        e.currentTarget.style.borderRadius = '4px'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {children}
      <div 
        style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          background: '#ff6b35',
          color: 'white',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          opacity: 0,
          transition: 'opacity 0.2s ease',
        }}
        className="edit-indicator"
      >
        ✏️
      </div>
    </div>
  )
}

// CSS for the edit button hover effect
export const inlineEditStyles = `
  .inline-edit-button:hover .edit-indicator {
    opacity: 1 !important;
  }
  
  .inline-edit-button:hover {
    outline: 2px solid #ff6b35 !important;
    outline-offset: 2px !important;
  }
`



