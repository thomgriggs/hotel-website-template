import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
	projectId: '0knotzp4', // Correct project ID
	dataset: 'production', // Your dataset name
	useCdn: true, // Use CDN for faster responses
	apiVersion: '2023-05-03', // Use current date (YYYY-MM-DD) for latest API
})

// Authenticated write client for mutations
export const writeClient = createClient({
	projectId: '0knotzp4',
	dataset: 'production',
	useCdn: false, // Don't use CDN for writes
	apiVersion: '2023-05-03',
	token: import.meta.env.SANITY_API_WRITE_TOKEN || import.meta.env.SANITY_API_READ_TOKEN,
})

// Image URL builder for Sanity images
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
	return builder.image(source)
}

// Hotel-specific queries
export const queries = {
	// Get all rooms
	rooms: `*[_type == "room"] | order(_createdAt desc) {
		_id,
		title,
		slug,
		description,
		price,
		maxOccupancy,
		roomSize,
		bedType,
		amenities,
		images,
		featured
	}`,
	
	// Get featured rooms
	featuredRooms: `*[_type == "room" && featured == true] | order(_createdAt desc) {
		_id,
		title,
		slug,
		description,
		price,
		maxOccupancy,
		roomSize,
		bedType,
		amenities,
		images
	}`,
	
	// Get single room by slug
	room: `*[_type == "room" && slug.current == $slug][0] {
		_id,
		title,
		slug,
		description,
		price,
		maxOccupancy,
		roomSize,
		bedType,
		amenities,
		images,
		featured
	}`,
	
	// Get all dining options
	dining: `*[_type == "dining"] | order(_createdAt desc) {
		_id,
		name,
		slug,
		description,
		cuisine,
		hours,
		priceRange,
		images,
		location,
		reservations,
		featured
	}`,
	
	// Get featured dining
	featuredDining: `*[_type == "dining" && featured == true] | order(_createdAt desc) {
		_id,
		name,
		slug,
		description,
		cuisine,
		hours,
		priceRange,
		images,
		location
	}`,
	
	// Get all amenities
	amenities: `*[_type == "amenity"] | order(_createdAt desc) {
		_id,
		title,
		slug,
		description,
		category,
		icon,
		images,
		location,
		features,
		ageRestriction,
		reservationRequired,
		additionalFee,
		feeAmount,
		featured
	}`,
	
	// Get featured amenities
	featuredAmenities: `*[_type == "amenity" && featured == true] | order(_createdAt desc) {
		_id,
		title,
		slug,
		description,
		category,
		icon,
		images,
		location,
		features
	}`,

	// Get single amenity by slug
	amenity: `*[_type == "amenity" && slug.current == $slug][0] {
		_id,
		title,
		slug,
		description,
		category,
		icon,
		images,
		location,
		features,
		ageRestriction,
		reservationRequired,
		additionalFee,
		feeAmount,
		featured
	}`,

	// Get single dining option by slug
	diningOption: `*[_type == "dining" && slug.current == $slug][0] {
		_id,
		name,
		slug,
		description,
		cuisine,
		hours,
		priceRange,
		images,
		location,
		reservations,
		menuHighlights,
		featured
	}`,

	// Get site settings
	siteSettings: `*[_type == "siteSettings"][0] {
		_id,
		title,
		description,
		logo,
		logoWhite,
		contactInfo,
		socialLinks,
		navigation,
		footerMenu,
		legalLinks,
		partnerLogos
	}`,

	// Get homepage content
	homepage: `*[_type == "homepage"][0] {
		_id,
		pageTitle,
		heroSubtitle,
		heroTitle,
		heroImage,
		mainHeading,
		mainDescription,
		primaryButtonText,
		primaryButtonUrl,
		secondaryButtonText,
		secondaryButtonUrl,
		roomsSectionTitle,
		diningSectionTitle,
		amenitiesSectionTitle
	}`,

	// Get contact page content
	contactPage: `*[_type == "contactPage"][0] {
		_id,
		pageTitle,
		heroTitle,
		heroSubtitle,
		heroImage,
		contactInfo,
		contactForm,
		mapSettings,
		additionalInfo
	}`,

	// Get location page content
	locationPage: `*[_type == "locationPage"][0] {
		_id,
		pageTitle,
		heroTitle,
		heroSubtitle,
		heroImage,
		address,
		mapSettings,
		directions,
		localAttractions,
		parkingInfo,
		accessibility
	}`,

	// Get aggregate page by page type
	aggregatePage: `*[_type == "aggregatePage" && pageType == $pageType][0] {
		_id,
		pageType,
		title,
		slug,
		description,
		heroImage,
		heroTitle,
		heroSubtitle,
		heroDescription,
		introSection,
		highlights,
		specialOffers,
		testimonials,
		ctaSection,
		seoSettings
	}`,

	// Get page by slug
	page: `*[_type == "page" && slug.current == $slug][0] {
		_id,
		pageType,
		slug,
		title,
		metaDescription,
		intro,
		sections,
		cta,
		seoSettings
	}`,

	// Get page by page type
	pageByType: `*[_type == "page" && pageType == $pageType][0] {
		_id,
		pageType,
		slug,
		title,
		metaDescription,
		intro,
		sections,
		cta,
		seoSettings
	}`,

	// Get all pages
	pages: `*[_type == "page"] | order(_createdAt desc) {
		_id,
		pageType,
		slug,
		title,
		metaDescription
	}`
}
