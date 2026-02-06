import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';

interface RelatedPostsProps {
  posts: Post[];
  currentSlug: string;
}

export default function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  const related = posts
    .filter(post => post.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map(post => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`}>
              {post.seo?.ogImage && (
                <div className="relative h-48 w-full mb-3 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={post.seo.ogImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
