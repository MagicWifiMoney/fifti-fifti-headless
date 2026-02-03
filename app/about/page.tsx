import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Fifti Fifti - your source for home decor and design inspiration',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Fifti Fifti</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-6">
          Welcome to Fifti Fifti, your trusted source for home decor inspiration, interior design tips, and lifestyle guidance.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          We believe that beautiful, functional living spaces should be accessible to everyone. That's why we curate and create content that helps you transform your house into a home you love.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Cover</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
          <li>Interior design ideas and trends</li>
          <li>Home decor inspiration</li>
          <li>DIY projects and tutorials</li>
          <li>Product recommendations and reviews</li>
          <li>Lifestyle tips for better living</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Affiliate Disclosure</h2>
        <p className="text-gray-700 mb-6">
          Some of our posts contain affiliate links. When you make a purchase through these links, we may earn a commission at no additional cost to you. This helps us continue creating valuable content for our readers.
        </p>
        
        <p className="text-gray-700">
          We only recommend products and services we genuinely believe will add value to your home and life.
        </p>
      </div>
    </div>
  );
}
