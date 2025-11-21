'use client';

import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { NewsArticle } from '@/lib/types';

interface FeaturedCarouselProps {
  articles: NewsArticle[];
}

export default function FeaturedCarousel({ articles }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (articles.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };

  if (articles.length === 0) return null;
  if (articles.length === 1) return <NewsCard article={articles[0]} featured />;

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {articles.map((article) => (
            <div key={article.id} className="min-w-full">
              <NewsCard article={article} featured />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {articles.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {articles.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-8 bg-orange-500' 
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
