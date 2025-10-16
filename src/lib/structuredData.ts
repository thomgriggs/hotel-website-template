// Enhanced structured data for better SEO
export function generateStructuredData(pageData: any, pageType: string = 'website') {
  const baseData = {
    "@context": "https://schema.org",
    "@type": pageType === "article" ? "Article" : "Hotel",
    "name": pageData.title || "Paradise Hotel",
    "description": pageData.description || "Luxury beachfront resort with world-class amenities",
    "url": pageData.url || "https://paradisehotel.com",
    "image": pageData.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=630&fit=crop&auto=format&q=80&fm=webp",
    "author": {
      "@type": "Organization",
      "name": "Paradise Hotel"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Paradise Hotel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop&auto=format&q=80&fm=webp"
      }
    }
  };

  // Add hotel-specific data
  if (pageType === "Hotel" || pageType === "website") {
    return {
      ...baseData,
      "@type": "Hotel",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Paradise Drive",
        "addressLocality": "Paradise City",
        "addressRegion": "Paradise State",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "telephone": "+1-555-PARADISE",
      "email": "info@paradisehotel.com",
      "priceRange": "$$$",
      "starRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Spa & Wellness Center",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification", 
          "name": "Fitness Center",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Infinity Pool", 
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Fine Dining",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Concierge Services",
          "value": true
        }
      ],
      "hasMap": "https://maps.google.com/maps?q=123+Paradise+Drive,+Paradise+City,+Paradise+State+12345",
      "checkinTime": "15:00",
      "checkoutTime": "11:00",
      "petsAllowed": false,
      "smokingAllowed": false,
      "currenciesAccepted": "USD",
      "paymentAccepted": ["Cash", "Credit Card", "Debit Card"]
    };
  }

  // Add article-specific data
  if (pageType === "article") {
    return {
      ...baseData,
      "@type": "Article",
      "datePublished": pageData.publishedTime || new Date().toISOString(),
      "dateModified": pageData.modifiedTime || new Date().toISOString(),
      "headline": pageData.title,
      "articleBody": pageData.description,
      "wordCount": pageData.description?.split(' ').length || 0
    };
  }

  // Add room-specific data
  if (pageType === "Room") {
    return {
      ...baseData,
      "@type": "HotelRoom",
      "occupancy": {
        "@type": "QuantitativeValue",
        "maxValue": pageData.maxOccupancy || 2,
        "minValue": 1
      },
      "bed": {
        "@type": "BedDetails",
        "numberOfBeds": pageData.numberOfBeds || 1,
        "typeOfBed": pageData.bedType || "King"
      },
      "amenityFeature": pageData.amenities?.map((amenity: string) => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity,
        "value": true
      })) || [],
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": pageData.squareFootage || 500,
        "unitCode": "SQF"
      }
    };
  }

  // Add restaurant-specific data
  if (pageType === "Restaurant") {
    return {
      ...baseData,
      "@type": "Restaurant",
      "servesCuisine": pageData.cuisine || "International",
      "priceRange": pageData.priceRange || "$$$",
      "hasMenu": pageData.menuUrl || false,
      "acceptsReservations": true,
      "openingHours": pageData.openingHours || "Mo-Su 06:00-23:00"
    };
  }

  return baseData;
}

// Generate breadcrumb structured data
export function generateBreadcrumbData(breadcrumbs: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

// Generate FAQ structured data
export function generateFAQData(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}




