import React from 'react'
import { LivePreview as SanityLivePreview } from '@sanity/preview-kit'
import { client } from '../lib/sanity'

interface LivePreviewProps {
  query: string
  params?: Record<string, any>
  children: React.ReactNode
  token?: string
}

export function LivePreview({ query, params = {}, children, token }: LivePreviewProps) {
  // Check if we're in preview mode
  const isPreview = typeof window !== 'undefined' && 
    (window.location.search.includes('preview=true') || 
     window.location.search.includes('preview=1'))

  if (!isPreview) {
    return <>{children}</>
  }

  return (
    <SanityLivePreview
      client={client}
      query={query}
      params={params}
      token={token || process.env.SANITY_API_READ_TOKEN}
    >
      {children}
    </SanityLivePreview>
  )
}

// Hook for preview mode detection
export function usePreview() {
  if (typeof window === 'undefined') return false
  
  return window.location.search.includes('preview=true') || 
         window.location.search.includes('preview=1')
}

// Component for preview mode indicator
export function PreviewModeIndicator() {
  const isPreview = usePreview()
  
  if (!isPreview) return null
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: '#ff6b35',
      color: 'white',
      padding: '8px 16px',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      zIndex: 9999,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      🔴 PREVIEW MODE - Changes are live
    </div>
  )
}



