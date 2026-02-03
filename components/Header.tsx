import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Fifti Fifti
          </Link>
          
          <div className="flex space-x-8">
            <Link href="/blog" className="text-gray-700 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-gray-900">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
