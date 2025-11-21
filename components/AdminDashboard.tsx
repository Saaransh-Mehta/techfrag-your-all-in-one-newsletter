'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface NewsFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string;
  readTime: number;
}

interface Article {
  id: string;
  title: string;
  publishedAt: Date;
  readTime: number;
  category: string;
}

interface AdminStats {
  totalArticles: number;
  totalSubscribers: number;
  subscribersThisMonth: number;
  recentArticles: Article[];
}

interface AdminDashboardProps {
  stats: AdminStats;
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Technology',
    imageUrl: '',
    readTime: 5,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const categories = ['Technology', 'Finance', 'Science', 'Space', 'Security', 'Education', 'Environment'];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'readTime' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to publish article');
      }

      setStatus('success');
      setMessage(data.message || 'News article published successfully! Emails are being sent to subscribers.');
      
      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: 'Technology',
        imageUrl: '',
        readTime: 5,
      });

      // Redirect to the published article
      setTimeout(() => {
        router.push(`/news/${data.article.id}`);
      }, 2000);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An error occurred');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const published = new Date(date);
    const diffTime = Math.abs(now.getTime() - published.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Calculate engagement rate (dummy calculation for now)
  const engagementRate = stats.totalSubscribers > 0 
    ? Math.min(Math.round((stats.totalArticles / stats.totalSubscribers) * 1000), 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold text-slate-900">Admin Panel</h1>
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  ← Back to Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
            <p className="text-slate-600">Create and publish new articles to the newsletter</p>
          </div>

          {/* Stats Cards with Real Data */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Total Articles</div>
              <div className="text-2xl font-bold text-slate-900">{stats.totalArticles}</div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Total Subscribers</div>
              <div className="text-2xl font-bold text-slate-900">{stats.totalSubscribers.toLocaleString()}</div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">This Month</div>
              <div className="text-2xl font-bold text-orange-500">+{stats.subscribersThisMonth}</div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-slate-200">
              <div className="text-sm text-slate-600 mb-1">Engagement</div>
              <div className="text-2xl font-bold text-orange-500">{engagementRate}%</div>
            </div>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg border ${
                status === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <p className="font-medium">{message}</p>
            </div>
          )}

          {/* Create Article Form */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Create New Article</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter article title"
                  required
                />
              </div>

              {/* Excerpt */}
              <div>
                <label htmlFor="excerpt" className="block text-sm font-semibold text-slate-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Write a brief excerpt (shown in article cards)"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-semibold text-slate-700 mb-2">
                  Article Content (HTML) *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={12}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
                  placeholder="<p>Article content here...</p>"
                  required
                />
                <p className="mt-2 text-xs text-slate-500">
                  You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, etc.
                </p>
              </div>

              {/* Row: Author & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="author" className="block text-sm font-semibold text-slate-700 mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row: Image URL & Read Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-semibold text-slate-700 mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="readTime" className="block text-sm font-semibold text-slate-700 mb-2">
                    Read Time (minutes) *
                  </label>
                  <input
                    type="number"
                    id="readTime"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    min="1"
                    max="60"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex-1 px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Publishing...' : 'Publish Article'}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({
                    title: '',
                    excerpt: '',
                    content: '',
                    author: '',
                    category: 'Technology',
                    imageUrl: '',
                    readTime: 5,
                  })}
                  className="px-8 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>

          {/* Recent Articles List with Real Data */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-bold mb-4 text-slate-900">Recent Articles</h2>
            {stats.recentArticles.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No articles published yet. Create your first article above!</p>
            ) : (
              <div className="space-y-3">
                {stats.recentArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{article.title}</h3>
                      <p className="text-sm text-slate-500">
                        {formatDate(article.publishedAt)} • {article.readTime} min read • {article.category}
                      </p>
                    </div>
                    <Link
                      href={`/news/${article.id}`}
                      className="px-3 py-1 text-sm bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
