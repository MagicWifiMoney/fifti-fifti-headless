import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';

interface FeaturedPostHeroProps {
  posts: Post[];
}

export default function FeaturedPostHero({ posts }: FeaturedPostHeroProps) {
  const featuredPost = posts[0];
  
  if (!featuredPost) return null;

  const formattedDate = new Date(featuredPost.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="relative bg-gray-900 mb-16">
      <div className="relative h-[500px] w-full">
        {featuredPost.seo?.ogImage && (
          <Image
            src={featuredPost.seo.ogImage}
            alt={featuredPost.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl">
              {featuredPost.categories && featuredPost.categories.length > 0 && (
                <Link
                  href={`/category/${featuredPost.categories[0]}`}
                  className="inline-block text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded mb-4 hover:bg-blue-700 transition-colors"
                >
                  {featuredPost.categories[0].toUpperCase()}
                </Link>
              )}
              
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                <Link href={`/blog/${featuredPost.slug}`} className="hover:text-blue-300 transition-colors">
                  {featuredPost.title}
                </Link>
              </h1>
              
              <p className="text-lg text-gray-200 mb-4 line-clamp-2">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <time dateTime={featuredPost.date}>{formattedDate}</time>
                <span>•</span>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="text-blue-300 hover:text-blue-200 font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
