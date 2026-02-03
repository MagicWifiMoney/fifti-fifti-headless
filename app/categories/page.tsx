import { getAllCategories } from '@/lib/posts';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all home decor and design categories',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
        <p className="text-xl text-gray-600">
          Browse all our content categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-gray-600 mb-4">{category.description}</p>
            )}
            <p className="text-sm text-gray-500">
              {category.count} {category.count === 1 ? 'post' : 'posts'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
