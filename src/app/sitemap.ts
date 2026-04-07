import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/estudios';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iglesiamegazoe.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/sobre-nosotros`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/estudios-biblicos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/estudios-biblicos/iglesia-en-las-casas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/estudios-biblicos/predicaciones`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/estudios-biblicos/otros-estudios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/biblioteca`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/musica`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contactanos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ];

  const slugs = getAllSlugs();
  const studyPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/biblioteca/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...studyPages];
}
