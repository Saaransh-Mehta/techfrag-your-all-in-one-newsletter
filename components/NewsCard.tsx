import Link from 'next/link';
import Image from 'next/image';
import { NewsArticle } from '@/lib/types';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
        return 'Date unavailable';
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(dateObj);
    } catch (error) {
      return 'Date unavailable';
    }
  };

  if (featured) {
    return (
      <Link 
        href={`/news/${article.id}`} 
        className="block group cursor-pointer touch-manipulation"
        prefetch={true}
      >
        <article className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-[450px]">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={true}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider bg-orange-500 text-white rounded">
              {article.category}
            </span>
            <h2 className="text-3xl font-bold mb-2 line-clamp-2 text-white group-hover:text-orange-400 transition-colors">
              {article.title}
            </h2>
            <p className="text-base text-slate-200 mb-3 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <span>{article.author}</span>
              <span>•</span>
              <span>{formatDate(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link 
      href={`/news/${article.id}`} 
      className="block group cursor-pointer touch-manipulation"
      prefetch={true}
    >
      <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-slate-200">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 rounded">
              {article.category}
            </span>
            <span className="text-xs text-slate-500">{article.readTime} min read</span>
          </div>
          <h3 className="text-lg font-bold mb-2 line-clamp-2 text-slate-900 group-hover:text-orange-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-slate-600 mb-4 line-clamp-3 flex-1 text-sm">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-slate-500 pt-3 border-t border-slate-100">
            <span className="font-medium">{article.author}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
