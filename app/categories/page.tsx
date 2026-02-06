import Link from 'next/link';
import CategoryGrid from '@/components/CategoryGrid';
import { getAllCategories } from '@/lib/posts';

export const metadata = {
  title: 'Categories',
  description: 'Browse all home decor and interior design categories.',
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  
  // Sort by post count
  const sortedCategories = [...categories].sort((a, b) => b.count - a.count);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse by Category</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore {categories.length} categories of home decor and design inspiration
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Grid */}
        <CategoryGrid categories={sortedCategories} />

        {/* Category List (for SEO) */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedCategories.map(category => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                      {category.description}
                    </p>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
