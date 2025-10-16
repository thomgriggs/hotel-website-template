import React, { useState } from 'react'
import { client } from '../lib/sanity'

interface FieldHelpProps {
  fieldName: string
  content?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const helpContent: Record<string, string> = {
  'room.title': 'Choose a descriptive title that highlights the room\'s best features (e.g., "Ocean View Deluxe Suite")',
  'room.description': 'Write a compelling description that sells the experience. Include key amenities and unique features.',
  'room.pricing.base': 'Set competitive pricing based on market rates, seasonality, and room amenities',
  'room.pricing.currency': 'Select the currency for pricing display',
  'room.amenities': 'Add amenities that guests value most. Consider WiFi, parking, breakfast, spa access, etc.',
  'room.images': 'Upload high-quality images that showcase the room\'s best features. Include multiple angles.',
  'room.capacity': 'Specify how many guests the room can accommodate comfortably',
  'room.size': 'Include room size in square feet or meters for guest reference',
  
  'dining.title': 'Create an appealing restaurant name that reflects the cuisine and atmosphere',
  'dining.description': 'Describe the dining experience, signature dishes, and unique features',
  'dining.cuisine': 'Select the primary cuisine type that best describes your restaurant',
  'dining.priceRange': 'Indicate price level: $ (Budget), $$ (Moderate), $$$ (Upscale), $$$$ (Fine Dining)',
  'dining.hours': 'List operating hours clearly. Consider seasonal variations.',
  'dining.location': 'Specify restaurant location within the hotel or nearby',
  'dining.menu': 'Upload or link to current menu. Keep it updated with seasonal changes.',
  
  'amenity.title': 'Use clear, descriptive names that guests will recognize',
  'amenity.description': 'Explain what the amenity offers and how it benefits guests',
  'amenity.category': 'Group amenities logically: Recreation, Wellness, Business, Family, etc.',
  'amenity.hours': 'Include operating hours and any seasonal availability',
  'amenity.location': 'Specify where guests can find this amenity',
  'amenity.pricing': 'Note if there are additional charges or if it\'s complimentary',
  
  'page.title': 'Create SEO-friendly titles that include relevant keywords',
  'page.metaDescription': 'Write compelling meta descriptions (150-160 characters) that encourage clicks',
  'page.slug': 'Use lowercase, hyphen-separated URLs that are easy to remember',
  'page.intro.title': 'Craft attention-grabbing headlines that communicate value',
  'page.intro.description': 'Write engaging introductions that hook visitors and encourage exploration',
  
  'siteSettings.title': 'This appears in browser tabs and search results. Keep it concise and branded.',
  'siteSettings.description': 'Brief description of your hotel that appears in search results',
  'siteSettings.contactInfo': 'Ensure all contact information is accurate and up-to-date',
  'siteSettings.socialLinks': 'Link to your active social media profiles',
  'siteSettings.footerMenu': 'Organize footer links logically for easy navigation'
}

export function FieldHelp({ fieldName, content, position = 'top' }: FieldHelpProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  const helpText = content || helpContent[fieldName] || 'No help available for this field'
  
  if (!helpText) return null

  return (
    <div 
      className="field-help"
      style={{ 
        position: 'relative', 
        display: 'inline-block',
        marginLeft: '8px'
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span 
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#6b7280',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
          cursor: 'help',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ff6b35'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#6b7280'
        }}
      >
        ?
      </span>
      
      {isVisible && (
        <div 
          style={{
            position: 'absolute',
            [position]: '100%',
            left: position === 'top' || position === 'bottom' ? '50%' : '100%',
            transform: position === 'top' || position === 'bottom' ? 'translateX(-50%)' : 'none',
            marginTop: position === 'top' ? '-8px' : '8px',
            marginLeft: position === 'left' ? '-8px' : '8px',
            padding: '12px',
            backgroundColor: '#1f2937',
            color: 'white',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '1.4',
            maxWidth: '300px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid #374151'
          }}
        >
          {helpText}
          <div 
            style={{
              position: 'absolute',
              [position === 'top' ? 'bottom' : 'top']: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '8px',
              height: '8px',
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderTop: position === 'top' ? 'none' : '1px solid #374151',
              borderBottom: position === 'top' ? '1px solid #374151' : 'none',
              transform: position === 'top' ? 'translateX(-50%) rotate(45deg)' : 'translateX(-50%) rotate(45deg)'
            }}
          />
        </div>
      )}
    </div>
  )
}

// Validation helper component
export function ValidationMessage({ 
  isValid, 
  message, 
  type = 'error' 
}: { 
  isValid: boolean
  message: string
  type?: 'error' | 'warning' | 'success'
}) {
  if (isValid) return null
  
  const colors = {
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981'
  }
  
  return (
    <div 
      style={{
        marginTop: '4px',
        padding: '8px 12px',
        backgroundColor: `${colors[type]}20`,
        border: `1px solid ${colors[type]}`,
        borderRadius: '4px',
        fontSize: '14px',
        color: colors[type]
      }}
    >
      {message}
    </div>
  )
}



