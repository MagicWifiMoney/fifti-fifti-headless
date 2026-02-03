import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const post = getPostBySlug(slug);
    
    return {
      title: post.title,
      description: post.seo?.metaDescription || post.excerpt,
      openGraph: {
        title: post.title,
        description: post.seo?.metaDescription || post.excerpt,
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.modified,
        images: post.seo?.ogImage ? [post.seo.ogImage] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.seo?.metaDescription || post.excerpt,
        images: post.seo?.ogImage ? [post.seo.ogImage] : [],
      },
      alternates: {
        canonical: post.seo?.canonical,
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  
  let post;
  try {
    post = getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Format content - split by double newlines to create paragraphs
  const paragraphs = post.content.split('\n\n').filter(p => p.trim());

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Featured Image */}
      {post.seo?.ogImage && (
        <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.seo.ogImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Categories */}
      <div className="flex items-center gap-2 mb-4">
        {post.categories?.map(category => (
          <Link
            key={category}
            href={`/category/${category}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 uppercase tracking-wide"
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
        <time dateTime={post.date}>{formattedDate}</time>
        {post.affiliateLinks && post.affiliateLinks.length > 0 && (
          <span className="text-sm text-gray-500">
            Contains affiliate links
          </span>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {paragraphs.map((paragraph, index) => {
          // Check if it's a heading
          if (paragraph.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.substring(2)}</h1>;
          }
          if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.substring(3)}</h2>;
          }
          if (paragraph.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{paragraph.substring(4)}</h3>;
          }
          if (paragraph.startsWith('#### ')) {
            return <h4 key={index} className="text-lg font-bold mt-4 mb-2">{paragraph.substring(5)}</h4>;
          }
          
          // Check if it's a list
          if (paragraph.includes('\n- ')) {
            const items = paragraph.split('\n').filter(line => line.startsWith('- '));
            return (
              <ul key={index} className="list-disc list-inside space-y-2 my-4">
                {items.map((item, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineContent(item.substring(2)) }} />
                ))}
              </ul>
            );
          }
          
          // Regular paragraph
          return (
            <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineContent(paragraph) }} />
          );
        })}
      </div>

      {/* Affiliate Link Disclosure */}
      {post.affiliateLinks && post.affiliateLinks.length > 0 && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Disclosure:</strong> This post contains affiliate links. If you make a purchase through these links, we may earn a commission at no additional cost to you.
          </p>
        </div>
      )}

      {/* Back to Blog */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/blog"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to all posts
        </Link>
      </div>

      {/* Schema.org structured data */}
      {post.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.seo.schema) }}
        />
      )}
    </article>
  );
}

// Helper function to format inline content (links, bold, italic)
function formatInlineContent(text: string): string {
  return text
    // Links with affiliate data
    .replace(/\[([^\]]+)\]\(([^)]+)\)\{data-affiliate="([^"]+)"\}/g, '<a href="$2" class="text-blue-600 hover:underline" data-affiliate="$3" target="_blank" rel="noopener">$1</a>')
    // Regular links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener">$1</a>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
