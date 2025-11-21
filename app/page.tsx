import NewsCard from '@/components/NewsCard';
import SubscriptionForm from '@/components/SubscriptionForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';

async function getNewsArticles() {
  try {
    const articles = await prisma.newsArticle.findMany({
      orderBy: {
        publishedAt: 'desc',
      },
      take: 7, // Get 7 articles (1 featured + 6 latest)
    });
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function Home() {
  const articles = await getNewsArticles();
  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1, 7);

  if (!featuredArticle) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">No Articles Yet</h2>
            <p className="text-slate-600 mb-8">Check back soon for the latest tech news!</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main>
        {/* Hero Section with Featured Article */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-orange-100 text-orange-700 rounded">
                Featured Story
              </span>
              <h2 className="text-lg text-slate-600 mt-2">The most important story of the week</h2>
            </div>
            <NewsCard article={featuredArticle} featured />
          </div>
        </section>

        {/* Latest News Grid */}
        <section id="latest" className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Latest News</h2>
              <p className="text-slate-600">
                Stay updated with the latest in tech, science, and innovation
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-10">
              <button className="px-8 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                Load More Articles
              </button>
            </div>
          </div>
        </section>

        {/* Subscription Section */}
        <section id="subscribe" className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SubscriptionForm />
          </div>
        </section>

        {/* Stats Section */}
          {/* Why Join TechFrag - brand-focused benefits */}
          <section className="py-12 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white">Why join TechFrag?</h2>
                <p className="text-slate-400 mt-2">Short, sharp tech insights designed for builders and curious minds.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-slate-800 rounded-lg">
                  <div className="text-2xl mb-2 text-orange-500">Curated Insights</div>
                  <div className="text-slate-400">Handpicked stories and analysis so you get only what matters.</div>
                </div>

                <div className="p-6 bg-slate-800 rounded-lg">
                  <div className="text-2xl mb-2 text-orange-500">Actionable Briefs</div>
                  <div className="text-slate-400">Practical takeaways you can use the same day — no fluff.</div>
                </div>

                <div className="p-6 bg-slate-800 rounded-lg">
                  <div className="text-2xl mb-2 text-orange-500">Exclusive Access</div>
                  <div className="text-slate-400">Early access to deep dives, interviews, and special editions.</div>
                </div>

                <div className="p-6 bg-slate-800 rounded-lg">
                  <div className="text-2xl mb-2 text-orange-500">Ad-free Experience</div>
                  <div className="text-slate-400">A clean, focused newsletter for readers who value quality.</div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a href="#subscribe" className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">Join the list</a>
              </div>
            </div>
          </section>
      </main>

      <Footer />
    </div>
  );
}
