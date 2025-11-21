import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/lib/types';

interface SidebarProps {
  latestNews: NewsArticle[];
  title?: string;
}

export default function Sidebar({ latestNews, title = 'Latest News' }: SidebarProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <aside className="space-y-6">
      <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200 sticky top-6">
        <h2 className="text-xl font-bold mb-5 pb-3 border-b border-slate-200 text-slate-900">
          {title}
        </h2>
        
        <div className="space-y-4">
          {latestNews.map((article, index) => (
            <Link
              key={article.id}
              href={`/news/${article.id}`}
              className="block group"
            >
              <article className="flex gap-3 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-1 text-slate-900 group-hover:text-orange-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{formatDate(article.publishedAt)}</span>
                    <span>•</span>
                    <span>{article.readTime} min</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        <Link
          href="/"
          className="block mt-5 pt-4 border-t border-slate-200 text-center text-orange-600 hover:text-orange-700 font-semibold transition-colors text-sm"
        >
          View All News →
        </Link>
      </div>
      
      {/* Newsletter Subscription Box */}
      <div className="bg-slate-900 rounded-lg p-5 shadow-sm border border-slate-800 text-white">
        <h3 className="text-lg font-bold mb-2">Never Miss an Update</h3>
        <p className="text-sm text-slate-300 mb-4">
          Subscribe to our newsletter for weekly tech insights.
        </p>
        <Link
          href="/#subscribe"
          className="block w-full py-2.5 bg-orange-500 text-white rounded-lg font-semibold text-center hover:bg-orange-600 transition-colors text-sm"
        >
          Subscribe Now
        </Link>
      </div>
      
      {/* Categories */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold mb-4 text-slate-900">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {['Technology', 'Finance', 'Science', 'Space', 'Security', 'Education'].map((category) => (
            <span
              key={category}
              className="px-3 py-1.5 bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-600 rounded text-sm font-medium cursor-pointer transition-colors"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
