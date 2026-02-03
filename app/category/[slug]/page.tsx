import { getAllCategories, getCategoryBySlug, getPostsByCategory } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: category.name,
    description: category.description || `Browse all ${category.name} posts`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <Link
          href="/categories"
          className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
        >
          ← All categories
        </Link>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        
        {category.description && (
          <p className="text-xl text-gray-600 mb-4">
            {category.description}
          </p>
        )}
        
        <p className="text-gray-500">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
