import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Fifti Fifti</h3>
            <p className="text-gray-600">
              Home decor and design for all
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Stay Connected</h4>
            <p className="text-gray-600">
              Subscribe to our newsletter for the latest home decor inspiration.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          © {currentYear} Fifti Fifti. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
