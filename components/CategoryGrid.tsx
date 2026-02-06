import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/posts';

interface CategoryGridProps {
  categories: Category[];
}

// Category images from Unsplash (themed for home decor)
const categoryImages: Record<string, string> = {
  'interior-design': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop',
  'home-decor': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop',
  'furniture': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
  'kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
  'bedroom': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop',
  'living-room': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
  'bathroom': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop',
  'outdoor': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
  'lighting': 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=300&fit=crop',
  'diy': 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400&h=300&fit=crop',
  default: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop'
};

function getCategoryImage(slug: string): string {
  return categoryImages[slug] || categoryImages.default;
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map(category => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="group relative h-40 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
        >
          <Image
            src={getCategoryImage(category.slug)}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-white text-lg mb-1">{category.name}</h3>
            <p className="text-gray-200 text-sm">{category.count} articles</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
