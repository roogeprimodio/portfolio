
import { MetadataRoute } from 'next'
import { portfolioData } from '@/lib/portfolio-data'
 
export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${portfolioData.personalInfo.url}/sitemap.xml`
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: sitemapUrl,
  }
}
