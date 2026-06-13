import { MetadataRoute } from 'next';
import { toolsList } from '../src/toolsList';
import { blogPosts } from '../src/blogPosts';

const BASE_URL = 'https://student-tools-seven.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/blog',
    '/categories/organize',
    '/categories/optimize',
    '/categories/convert-to',
    '/categories/convert-from',
    '/categories/edit-pdf',
    '/categories/security',
    '/categories/pdf-intelligence',
    '/categories/student-tools',
    '/categories/productivity-tools'
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const toolRoutes = toolsList.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.id}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...toolRoutes, ...blogRoutes];
}
