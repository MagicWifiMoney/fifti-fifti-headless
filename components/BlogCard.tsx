import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';

interface BlogCardProps {
  post: Post;
  variant?: 'vertical' | 'horizontal';
}

export default function BlogCard({ post, variant = 'vertical' }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate reading time
  const words = post.content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  if (variant === 'horizontal') {
    return (
      <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="grid md:grid-cols-3 gap-6">
          {post.seo?.ogImage && (
            <Link href={`/blog/${post.slug}`} className="md:col-span-1">
              <div className="relative h-48 md:h-full w-full bg-gray-200">
                <Image
                  src={post.seo.ogImage}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </Link>
          )}
          
          <div className={`p-6 ${post.seo?.ogImage ? 'md:col-span-2' : 'md:col-span-3'}`}>
            <div className="flex items-center gap-3 mb-3">
              {post.categories?.slice(0, 2).map(category => (
                <Link
                  key={category}
                  href={`/category/${category}`}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 uppercase tracking-wide"
                >
                  {category}
                </Link>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            
            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time dateTime={post.date}>{formattedDate}</time>
              <span>•</span>
              <span>{readingTime} min read</span>
              <span className="ml-auto">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read Article →
                </Link>
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Vertical variant (default)
  return (
    <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {post.seo?.ogImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 w-full bg-gray-200">
            <Image
              src={post.seo.ogImage}
              alt={post.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {post.categories?.slice(0, 2).map(category => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 uppercase tracking-wide"
            >
              {category}
            </Link>
          ))}
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            <time dateTime={post.date}>{formattedDate}</time>
            <span>•</span>
            <span>{readingTime} min</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
