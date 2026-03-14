import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://harish.dev',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
       url: 'https://harish.dev/admin/login',
       lastModified: new Date(),
       changeFrequency: 'monthly',
       priority: 0.1,
     },
  ]
}
