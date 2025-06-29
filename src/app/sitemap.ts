
import { MetadataRoute } from 'next'
import { portfolioData } from '@/lib/portfolio-data';
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: portfolioData.personalInfo.url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}
