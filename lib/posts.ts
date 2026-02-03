import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const pagesDirectory = path.join(process.cwd(), 'content/pages');

export interface Post {
  slug: string;
  title: string;
  date: string;
  modified: string;
  excerpt: string;
  content: string;
  author: number;
  featuredImage: number | null;
  categories: string[];
  tags: number[];
  affiliateLinks?: Array<{
    url: string;
    lassoId: string;
    text: string;
  }>;
  seo: {
    metaDescription: string;
    ogImage: string | null;
    canonical: string;
    schema?: any;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

// Get all post slugs
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''));
}

// Get post data by slug
export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data
  } as Post;
}

// Get all posts (sorted by date, newest first)
export function getAllPosts(limit?: number): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  
  return limit ? posts.slice(0, limit) : posts;
}

// Get posts by category
export function getPostsByCategory(categorySlug: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.categories?.includes(categorySlug));
}

// Get all categories
export function getAllCategories(): Category[] {
  const categoriesPath = path.join(process.cwd(), 'content/categories/categories.json');
  const categoriesData = fs.readFileSync(categoriesPath, 'utf8');
  return JSON.parse(categoriesData);
}

// Get category by slug
export function getCategoryBySlug(slug: string): Category | undefined {
  const categories = getAllCategories();
  return categories.find(cat => cat.slug === slug);
}

// Get all page slugs
export function getAllPageSlugs() {
  const fileNames = fs.readdirSync(pagesDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx$/, ''));
}

// Get page data by slug
export function getPageBySlug(slug: string) {
  const fullPath = path.join(pagesDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data
  };
}

// Search posts
export function searchPosts(query: string): Post[] {
  const allPosts = getAllPosts();
  const lowerQuery = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery)
  );
}
