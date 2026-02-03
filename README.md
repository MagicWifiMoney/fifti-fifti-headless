# Fifti Fifti - Headless Next.js Blog

A modern, headless Next.js implementation of the Fifti Fifti home decor and design blog.

## 📊 Stats

- **534 blog posts** - All migrated from WordPress
- **19 pages** - Static pages and content
- **19 categories** - Home decor, design, lifestyle topics
- **2,180 affiliate links** - Preserved with tracking across 512 posts
- **100% Static** - All pages pre-rendered for blazing fast performance

## 🚀 Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **MDX** - Markdown with React components
- **Turbopack** - Fast bundler

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
│   ├── blog/              # Blog listing and individual posts
│   ├── category/          # Category pages
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── sitemap.ts         # Auto-generated sitemap
│   └── robots.ts          # SEO robots.txt
├── components/            # Reusable React components
│   ├── Header.tsx         # Site navigation
│   ├── Footer.tsx         # Site footer
│   └── BlogCard.tsx       # Blog post card component
├── content/               # All blog content (MDX)
│   ├── posts/            # 534 blog posts in MDX format
│   ├── pages/            # Static pages
│   ├── categories/       # Category metadata
│   └── posts-index.json  # Post index for fast lookups
└── lib/                   # Utility functions
    └── posts.ts          # Content fetching logic
```

## 🎨 Features

- ✅ Fully responsive design
- ✅ SEO optimized (meta tags, structured data, sitemap)
- ✅ Affiliate link tracking system
- ✅ Category-based navigation
- ✅ Fast static generation
- ✅ Mobile-friendly
- ✅ Clean, modern design
- ✅ Image optimization

## 🔗 Affiliate Links

The site preserves all affiliate links from the original WordPress site with `data-lasso-id` attributes for tracking. Affiliate disclosures are automatically shown on posts containing affiliate links.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Content Management

Content is stored as MDX files in the `content/` directory. Each post includes:

- Frontmatter metadata (title, date, categories, SEO data)
- Affiliate link information
- Featured images
- Structured data for search engines

## 🚢 Deployment

Deployed on **Vercel** for optimal performance and automatic deployments from GitHub.

## 📄 License

All content © Fifti Fifti. All rights reserved.

## 🔄 WordPress Integration

The original WordPress site remains active at fifti-fifti.net for content management. This Next.js frontend can pull updates via the WordPress REST API or manual exports.

---

Built with ❤️ using Next.js
