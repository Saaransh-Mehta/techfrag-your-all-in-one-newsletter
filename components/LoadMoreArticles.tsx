'use client';

import { useState } from 'react';
import NewsCard from './NewsCard';
import { NewsArticle } from '@/lib/types';

interface LoadMoreArticlesProps {
  initialArticles: NewsArticle[];
}

export default function LoadMoreArticles({ initialArticles }: LoadMoreArticlesProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/articles?skip=${articles.length}&take=3`);
      const data = await response.json();
      
      if (data.articles && data.articles.length > 0) {
        setArticles([...articles, ...data.articles]);
        if (data.articles.length < 3) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-10">
          <button 
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Load More Articles'}
          </button>
        </div>
      )}
    </>
  );
}
