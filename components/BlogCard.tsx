import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {post.seo?.ogImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 w-full bg-gray-200">
            <Image
              src={post.seo.ogImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {post.categories?.map(category => (
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
          <time dateTime={post.date}>{formattedDate}</time>
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
