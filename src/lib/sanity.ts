import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
	projectId: '0knotzp4', // Correct project ID
	dataset: 'production', // Your dataset name
	useCdn: true, // Use CDN for faster responses
	apiVersion: '2023-05-03', // Use current date (YYYY-MM-DD) for latest API
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
	}`
}
