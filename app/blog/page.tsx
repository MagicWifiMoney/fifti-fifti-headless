import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Browse all our home decor and interior design articles',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          All our home decor and design articles ({posts.length} posts)
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
