import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { prisma } from '@/lib/prisma';
import DOMPurify from 'isomorphic-dompurify';

async function getArticleById(id: string) {
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { id },
    });
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

async function getLatestArticles(excludeId: string) {
  try {
    const articles = await prisma.newsArticle.findMany({
      where: {
        id: {
          not: excludeId,
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 5,
    });
    return articles;
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);
  
  if (!article) {
    notFound();
  }

  const latestNews = await getLatestArticles(article.id);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-slate-600">
              <li><Link href="/" className="hover:text-orange-600">Home</Link></li>
              <li>/</li>
              <li className="text-slate-900 font-medium truncate">{article.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
                {/* Article Header */}
                <div className="relative h-80">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider bg-orange-500 text-white rounded">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight text-slate-900">
                    {article.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 pb-5 mb-5 border-b border-slate-200 text-slate-600">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {article.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{article.author}</div>
                        <div className="text-sm text-slate-500">Author</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span>{formatDate(article.publishedAt)}</span>
                      <span>•</span>
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
                  />

                  {/* Share Section */}
                  <div className="mt-10 pt-6 border-t border-slate-200">
                    <h3 className="text-base font-semibold mb-4 text-slate-900">Share this article</h3>
                    <div className="flex gap-3">
                      <button className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
                        Twitter
                      </button>
                      <button className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
                        Facebook
                      </button>
                      <button className="px-5 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
                        LinkedIn
                      </button>
                      <button className="px-5 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm">
                        Copy Link
                      </button>
                    </div>
                  </div>

                  {/* Related Articles CTA */}
                  <div className="mt-8 p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="text-lg font-bold mb-2 text-slate-900">Want more stories like this?</h3>
                    <p className="text-slate-600 mb-4">
                      Subscribe to our newsletter and never miss the latest tech news.
                    </p>
                    <Link
                      href="/#subscribe"
                      className="inline-block px-6 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      Subscribe Now
                    </Link>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar latestNews={latestNews} title="More Stories" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
