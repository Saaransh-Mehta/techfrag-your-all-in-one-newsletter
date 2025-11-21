'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 shadow-md sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                TechFrag
              </h1>
              <p className="text-xs text-slate-400">Tech Newsletter</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-300 hover:text-orange-500 font-medium transition-colors">
              Home
            </Link>
            <Link href="/#latest" className="text-slate-300 hover:text-orange-500 font-medium transition-colors">
              Latest
            </Link>
            <Link href="/#subscribe" className="text-slate-300 hover:text-orange-500 font-medium transition-colors">
              Subscribe
            </Link>
            <Link
              href="/#subscribe"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Get Newsletter
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-2 text-slate-300 hover:text-orange-500 hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/#latest" 
              className="block px-4 py-2 text-slate-300 hover:text-orange-500 hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Latest
            </Link>
            <Link 
              href="/#subscribe" 
              className="block px-4 py-2 text-slate-300 hover:text-orange-500 hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Subscribe
            </Link>
            <Link
              href="/#subscribe"
              className="block mx-4 px-6 py-2 bg-orange-500 text-white text-center rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Newsletter
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
