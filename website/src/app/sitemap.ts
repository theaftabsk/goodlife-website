import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://goodlifesutra.com'
  const now = new Date()

  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/solutions/launch-online', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/solutions/fix-and-grow', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/solutions/scale-pan-india', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/brand-launch-incubation', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/d2c-commerce-operations', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/b2b-institutional-commerce', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/multi-platform-commerce', priority: 0.85, changeFrequency: 'monthly' as const },
    { url: '/capabilities/marketplace-operations', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/capabilities/marketplace-growth', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/capabilities/inventory-planning', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/capabilities/warehousing-fulfilment', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/capabilities/revenue-assurance', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/capabilities/returns-operations', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/specialised/heavy-bulky-commerce', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/specialised/fulfilment-network', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/specialised/agency-partner', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/case-studies', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/insights', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/careers', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/faqs', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return routes.map(route => ({
    url: `${baseUrl}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
