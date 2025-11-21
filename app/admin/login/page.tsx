'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect to admin panel
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setStatus('error');
    } finally {
      if (status !== 'error') {
        setStatus('idle');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">TF</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">TechFrag</h1>
          </div>
          <h2 className="text-xl font-semibold text-slate-700">Admin Login</h2>
          <p className="text-slate-500 mt-2">Sign in to access the admin panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your username"
                required
                disabled={status === 'loading'}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your password"
                required
                disabled={status === 'loading'}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-slate-600 hover:text-orange-600 transition-colors">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
