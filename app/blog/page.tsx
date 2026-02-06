import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Blog',
  description: 'Browse all our home decor articles, interior design tips, and lifestyle inspiration.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover {posts.length}+ articles on home decor, interior design, and lifestyle inspiration
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{posts.length}</span> articles
              </p>
            </div>
            
            <div className="space-y-8">
              {posts.map(post => (
                <BlogCard key={post.slug} post={post} variant="horizontal" />
              ))}
            </div>

            {posts.length === 0 && (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-600">No posts found.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
