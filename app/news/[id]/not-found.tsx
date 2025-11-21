import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-slate-700 mb-4">
            Article Not Found
          </h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
