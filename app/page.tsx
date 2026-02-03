import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import { getAllPosts, getAllCategories } from '@/lib/posts';

export default function HomePage() {
  const latestPosts = getAllPosts(9);
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Fifti Fifti
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your source for inspiring home decor ideas, interior design tips, and lifestyle inspiration
        </p>
      </div>

      {/* Featured Categories */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map(category => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{category.count} posts</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/categories"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View all categories →
          </Link>
        </div>
      </div>

      {/* Latest Posts */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
          <Link
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View all posts →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
