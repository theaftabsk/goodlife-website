import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://goodlifesutra.com'
  const now = new Date()

  // Strictly according to Master Document Part 2.1 Blueprint
  const routes = [
    // Core Pages
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    
    // Solution Pages (3 pages)
    { url: '/solutions/launch-online', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/solutions/fix-and-grow', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/solutions/scale-pan-india', priority: 0.9, changeFrequency: 'monthly' as const },
    
    // Capability Pages (6 pages)
    { url: '/capabilities/marketplace-operations', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/capabilities/marketplace-growth', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/capabilities/inventory-planning', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/capabilities/warehousing-fulfilment', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/capabilities/revenue-assurance', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/capabilities/returns-operations', priority: 0.85, changeFrequency: 'monthly' as const },
    
    // Specialised Pages (3 pages)
    { url: '/specialised/heavy-bulky-commerce', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/specialised/fulfilment-network', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/specialised/agency-partner', priority: 0.8, changeFrequency: 'monthly' as const },
    
    // Content & Authority Pages
    { url: '/case-studies', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/insights', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/faqs', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return routes.map(route => ({
    url: `${baseUrl}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
