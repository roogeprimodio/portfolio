import { MetadataRoute } from 'next'
import { portfolioData } from '@/lib/portfolio-data';
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${portfolioData.personalInfo.name}'s Portfolio`,
    short_name: portfolioData.personalInfo.name,
    description: portfolioData.personalInfo.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#08081F', // Dark background from theme
    theme_color: '#F2F3F7', // Light background from theme
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
