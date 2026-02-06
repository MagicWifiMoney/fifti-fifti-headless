import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPageBySlug, getAllPageSlugs } from '@/lib/posts';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = getPageBySlug(slug);
    return {
      title: page.title,
      description: page.seo?.metaDescription || page.excerpt || `${page.title} - Fifti Fifti`,
      openGraph: {
        title: page.title,
        description: page.seo?.metaDescription || page.excerpt,
        type: 'website',
      },
    };
  } catch {
    return {
      title: 'Page Not Found',
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  
  // Skip routes that have their own page files
  const reservedSlugs = ['about', 'blog', 'categories', 'category'];
  if (reservedSlugs.includes(slug)) {
    notFound();
  }
  
  try {
    const page = getPageBySlug(slug);
    
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{page.title}</h1>
        
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-rose-600 hover:prose-a:text-rose-700">
          {/* Render MDX content - for now just use dangerouslySetInnerHTML for markdown-like content */}
          <div dangerouslySetInnerHTML={{ __html: parseContent(page.content) }} />
        </div>
        
        {/* Contact form placeholder for write-for-us pages */}
        {slug.includes('write-for-us') || slug.includes('guest-post') || slug.includes('submit') ? (
          <div className="mt-12 p-8 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit Your Pitch</h2>
            <p className="text-gray-700 mb-6">
              Ready to contribute? Send your pitch to{' '}
              <a href="mailto:hello@fifti-fifti.net" className="text-rose-600 hover:text-rose-700 font-medium">
                hello@fifti-fifti.net
              </a>
            </p>
            <p className="text-sm text-gray-500">
              Include your topic idea, a brief outline, and links to your previous work.
            </p>
          </div>
        ) : null}
        
        {/* Back to main write-for-us page */}
        {(slug.includes('write-for-us-') || slug.includes('-guest-post') || slug.includes('submit-')) && (
          <div className="mt-8">
            <Link 
              href="/write-for-us" 
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              ← Back to all guest post opportunities
            </Link>
          </div>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}

// Simple content parser - converts markdown-like content to HTML
function parseContent(content: string): string {
  // Skip Visual Composer shortcodes
  if (content.includes('[vc_')) {
    // Extract just the text content from VC shortcodes
    content = content
      .replace(/\[vc_[^\]]*\]/g, '')
      .replace(/\[\/vc_[^\]]*\]/g, '')
      .replace(/\[split_line_heading[^\]]*\]/g, '')
      .replace(/\[\/split_line_heading\]/g, '')
      .replace(/\[contact-form-7[^\]]*\]/g, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/&\#8243;/g, '"')
      .replace(/&\#8230;/g, '...');
  }
  
  // Convert markdown to HTML
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-rose-600 hover:text-rose-700">$1</a>')
    // Lists
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul class="list-disc list-inside space-y-2 my-4">$&</ul>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return `<p class="mb-4">${match}</p>`;
    })
    // Clean up
    .replace(/<p class="mb-4"><\/p>/g, '')
    .replace(/<p class="mb-4">(<h[123])/g, '$1')
    .replace(/(<\/h[123]>)<\/p>/g, '$1')
    .replace(/<p class="mb-4">(<ul)/g, '$1')
    .replace(/(<\/ul>)<\/p>/g, '$1');
}
