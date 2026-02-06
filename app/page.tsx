import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import FeaturedPostHero from '@/components/FeaturedPostHero';
import CategoryGrid from '@/components/CategoryGrid';
import Sidebar from '@/components/Sidebar';
import { getAllPosts, getAllCategories } from '@/lib/posts';

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.slice(0, 5);
  const latestPosts = allPosts.slice(5, 14);
  const categories = getAllCategories();
  const topCategories = categories.slice(0, 8);

  return (
    <>
      {/* Featured Post Hero */}
      <FeaturedPostHero posts={featuredPosts} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Browse Categories Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Explore by Category</h2>
                <Link
                  href="/categories"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View All →
                </Link>
              </div>
              <CategoryGrid categories={topCategories} />
            </section>

            {/* Latest Posts Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
                <Link
                  href="/blog"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All Posts →
                </Link>
              </div>
              
              <div className="space-y-8">
                {latestPosts.map(post => (
                  <BlogCard key={post.slug} post={post} variant="horizontal" />
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/blog"
                  className="inline-block bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All {allPosts.length} Articles
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
