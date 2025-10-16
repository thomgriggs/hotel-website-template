// Image optimization utilities
export function getOptimizedImageUrl(image: any, width: number, height: number, format: 'webp' | 'avif' | 'jpg' = 'webp'): string {
  if (!image?.asset?._ref) {
    // Use optimized placeholder service
    return `https://picsum.photos/seed/luxuryhotel/${width}/${height}.${format}`;
  }
  
  // Use Sanity's image transformation API
  const urlBuilder = require('@sanity/image-url');
  const client = require('@sanity/client')({
    projectId: '0knotzp4',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03'
  });
  
  const builder = urlBuilder(client);
  
  return builder
    .image(image)
    .width(width)
    .height(height)
    .format(format)
    .quality(85)
    .auto('format')
    .url();
}

export function getUnsplashImage(keyword: string, width: number, height: number, format: 'webp' | 'avif' | 'jpg' = 'webp'): string {
  // Use Unsplash Source API with optimization
  const seed = keyword.replace(/\s+/g, '-').toLowerCase();
  return `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=${width}&h=${height}&fit=crop&crop=center&auto=format&q=80&fm=${format}`;
}

// Preload critical images
export function preloadCriticalImages() {
  const criticalImages = [
    '/hero-image.webp',
    '/logo-placeholder.webp',
    '/logo-white-placeholder.webp'
  ];
  
  return criticalImages.map(src => 
    `<link rel="preload" as="image" href="${src}" fetchpriority="high">`
  ).join('\n');
}




