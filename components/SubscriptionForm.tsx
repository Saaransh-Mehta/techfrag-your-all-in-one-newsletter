'use client';

import { useState, useEffect } from 'react';

export default function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Check if user is already subscribed on component mount
  useEffect(() => {
    const checkSubscription = async () => {
      const storedEmail = localStorage.getItem('subscriberEmail');
      if (!storedEmail) {
        setCheckingStatus(false);
        return;
      }

      try {
        const response = await fetch('/api/subscribe/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: storedEmail }),
        });

        const data = await response.json();
        setIsSubscribed(data.isSubscribed);
        if (data.isSubscribed) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkSubscription();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing!');
        setIsSubscribed(true);
        
        // Store email in localStorage to remember subscription
        localStorage.setItem('subscriberEmail', email);
        
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please check your connection.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  // Show loading state while checking subscription
  if (checkingStatus) {
    return (
      <div className="bg-slate-900 rounded-lg p-8 md:p-10 text-white shadow-lg border border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show "Already Subscribed" message if user is subscribed
  if (isSubscribed) {
    return (
      <div className="bg-slate-900 rounded-lg p-8 md:p-10 text-white shadow-lg border border-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            You're Already Subscribed! 🎉
          </h2>
          <p className="text-lg mb-6 text-slate-300">
            You're all set to receive the latest tech news and insights at <strong className="text-orange-400">{email}</strong>
          </p>
          <p className="text-sm text-slate-400">
            Keep an eye on your inbox for our latest articles!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-lg p-8 md:p-10 text-white shadow-lg border border-slate-800">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">
          Subscribe to TechFrag Newsletter
        </h2>
        <p className="text-lg mb-8 text-slate-300">
          Get the latest tech news, insights, and exclusive content delivered directly to your inbox every week.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-6 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base bg-white"
            disabled={status === 'loading'}
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </form>
        
        {message && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              status === 'success'
                ? 'bg-green-500/20 border border-green-400 text-green-100'
                : 'bg-red-500/20 border border-red-400 text-red-100'
            }`}
          >
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}
        
        <p className="text-sm text-slate-400 mt-4">
          No spam, unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </div>
  );
}
