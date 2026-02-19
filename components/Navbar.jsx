'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              RAG Assistant
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`${
                pathname === '/'
                  ? 'text-primary-600 font-semibold'
                  : 'text-gray-600 hover:text-primary-600'
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/chat"
              className={`${
                pathname === '/chat'
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
              } px-4 py-2 rounded-lg transition-colors font-medium`}
            >
              Chat Assistant
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}