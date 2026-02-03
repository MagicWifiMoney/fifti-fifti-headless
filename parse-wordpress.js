const fs = require('fs');
const path = require('path');

// Load WordPress export
const wpData = JSON.parse(fs.readFileSync('./wordpress-export.json', 'utf8'));

console.log('Parsing WordPress export...');
console.log(`Total posts: ${wpData.posts.length}`);
console.log(`Total pages: ${wpData.pages.length}`);
console.log(`Total categories: ${wpData.categories.length}`);

// Helper function to convert HTML to clean markdown-ish content
function htmlToMarkdown(html) {
  if (!html) return '';
  
  let content = html
    // Remove WordPress blocks and comments
    .replace(/<!-- wp:.*?-->/g, '')
    .replace(/<!-- \/wp:.*?-->/g, '')
    
    // Convert headings
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
    
    // Convert paragraphs
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    
    // Convert lists
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    
    // Convert links - preserve data-lasso-id for affiliate tracking
    .replace(/<a\s+([^>]*href="([^"]*)"[^>]*data-lasso-id="([^"]*)"[^>]*)>(.*?)<\/a>/gi, '[$4]($2){data-affiliate="$3"}')
    .replace(/<a\s+([^>]*href="([^"]*)"[^>]*)>(.*?)<\/a>/gi, '[$3]($2)')
    
    // Convert formatting
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    
    // Remove remaining HTML tags
    .replace(/<[^>]+>/g, '')
    
    // Decode HTML entities
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    
    // Clean up extra whitespace
    .replace(/\n\n\n+/g, '\n\n')
    .trim();
  
  return content;
}

// Extract affiliate links from a post
function extractAffiliateLinks(html) {
  if (!html) return [];
  
  const affiliateLinks = [];
  const regex = /<a\s+[^>]*href="([^"]*)"[^>]*data-lasso-id="([^"]*)"[^>]*>(.*?)<\/a>/gi;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    affiliateLinks.push({
      url: match[1],
      lassoId: match[2],
      text: match[3].replace(/<[^>]+>/g, '')
    });
  }
  
  return affiliateLinks;
}

// Create content directory structure
const contentDir = './content';
const postsDir = path.join(contentDir, 'posts');
const pagesDir = path.join(contentDir, 'pages');
const categoriesDir = path.join(contentDir, 'categories');

[contentDir, postsDir, pagesDir, categoriesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Save categories
console.log('\nProcessing categories...');
const categoriesData = wpData.categories.map(cat => ({
  id: cat.id,
  name: cat.name,
  slug: cat.slug,
  description: cat.description || '',
  count: cat.count || 0
}));

fs.writeFileSync(
  path.join(categoriesDir, 'categories.json'),
  JSON.stringify(categoriesData, null, 2)
);

console.log(`✓ Saved ${categoriesData.length} categories`);

// Process posts
console.log('\nProcessing blog posts...');
let processedPosts = 0;
let affiliateLinkStats = [];

wpData.posts.forEach(post => {
  // Extract data
  const affiliateLinks = extractAffiliateLinks(post.content.rendered);
  const content = htmlToMarkdown(post.content.rendered);
  const excerpt = htmlToMarkdown(post.excerpt.rendered);
  
  // Get category names
  const categoryNames = post.categories
    .map(catId => {
      const cat = wpData.categories.find(c => c.id === catId);
      return cat ? cat.slug : null;
    })
    .filter(Boolean);
  
  // Create frontmatter
  const frontmatter = {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    date: post.date,
    modified: post.modified,
    excerpt: excerpt,
    author: post.author,
    featuredImage: post.featured_media || null,
    categories: categoryNames,
    tags: post.tags || [],
    affiliateLinks: affiliateLinks.length > 0 ? affiliateLinks : undefined,
    seo: {
      metaDescription: post.yoast_head_json?.description || excerpt.substring(0, 160),
      ogImage: post.yoast_head_json?.og_image?.[0]?.url || null,
      canonical: post.link,
      schema: post.yoast_head_json?.schema || null
    }
  };
  
  // Create MDX file
  const mdxContent = `---
${JSON.stringify(frontmatter, null, 2).slice(1, -1)}
---

${content}
`;
  
  const filename = `${post.slug}.mdx`;
  fs.writeFileSync(path.join(postsDir, filename), mdxContent);
  
  processedPosts++;
  
  if (affiliateLinks.length > 0) {
    affiliateLinkStats.push({
      slug: post.slug,
      title: post.title.rendered,
      affiliateCount: affiliateLinks.length
    });
  }
  
  if (processedPosts % 50 === 0) {
    console.log(`  Processed ${processedPosts} posts...`);
  }
});

console.log(`✓ Processed ${processedPosts} posts`);

// Process pages
console.log('\nProcessing pages...');
let processedPages = 0;

wpData.pages.forEach(page => {
  const content = htmlToMarkdown(page.content.rendered);
  const excerpt = htmlToMarkdown(page.excerpt.rendered);
  
  const frontmatter = {
    id: page.id,
    title: page.title.rendered,
    slug: page.slug,
    date: page.date,
    modified: page.modified,
    excerpt: excerpt,
    seo: {
      metaDescription: page.yoast_head_json?.description || excerpt.substring(0, 160),
      ogImage: page.yoast_head_json?.og_image?.[0]?.url || null,
      canonical: page.link
    }
  };
  
  const mdxContent = `---
${JSON.stringify(frontmatter, null, 2).slice(1, -1)}
---

${content}
`;
  
  const filename = `${page.slug}.mdx`;
  fs.writeFileSync(path.join(pagesDir, filename), mdxContent);
  processedPages++;
});

console.log(`✓ Processed ${processedPages} pages`);

// Save affiliate link stats
if (affiliateLinkStats.length > 0) {
  fs.writeFileSync(
    path.join(contentDir, 'affiliate-links-stats.json'),
    JSON.stringify(affiliateLinkStats, null, 2)
  );
  console.log(`\n✓ Found ${affiliateLinkStats.length} posts with affiliate links`);
  console.log(`  Total affiliate links: ${affiliateLinkStats.reduce((sum, p) => sum + p.affiliateCount, 0)}`);
}

// Create index files
const postsIndex = wpData.posts.map(post => ({
  slug: post.slug,
  title: post.title.rendered,
  date: post.date,
  excerpt: htmlToMarkdown(post.excerpt.rendered).substring(0, 200),
  categories: post.categories
    .map(catId => {
      const cat = wpData.categories.find(c => c.id === catId);
      return cat ? cat.slug : null;
    })
    .filter(Boolean),
  featuredImage: post.featured_media || null
}));

fs.writeFileSync(
  path.join(contentDir, 'posts-index.json'),
  JSON.stringify(postsIndex, null, 2)
);

console.log('\n✅ WordPress content successfully parsed!');
console.log(`\nSummary:`);
console.log(`  Posts: ${processedPosts}`);
console.log(`  Pages: ${processedPages}`);
console.log(`  Categories: ${categoriesData.length}`);
console.log(`  Posts with affiliate links: ${affiliateLinkStats.length}`);
