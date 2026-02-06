import Link from 'next/link';
import { getAllCategories, getAllPosts } from '@/lib/posts';

export default function Sidebar() {
  const categories = getAllCategories().slice(0, 10);
  const recentPosts = getAllPosts(5);
  
  return (
    <aside className="space-y-8">
      {/* About Widget */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About Fifti Fifti</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Your trusted source for home decor inspiration, interior design tips, and lifestyle ideas. 
          We've been helping homeowners create beautiful spaces since 2015.
        </p>
      </div>

      {/* Categories Widget */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                className="flex justify-between items-center text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <span className="text-sm group-hover:translate-x-1 transition-transform inline-block">
                  {category.name}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/categories"
          className="block mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Categories →
        </Link>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map(post => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group"
              >
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <time className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg text-white shadow-lg">
        <h3 className="text-lg font-bold mb-3">Stay Inspired</h3>
        <p className="text-sm text-blue-100 mb-4">
          Get weekly home decor tips and design inspiration delivered to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-2 rounded text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-medium py-2 px-4 rounded hover:bg-blue-50 transition-colors text-sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </aside>
  );
}
