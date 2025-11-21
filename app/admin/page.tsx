'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';

interface AdminStats {
  totalArticles: number;
  totalSubscribers: number;
  subscribersThisMonth: number;
  recentArticles: any[];
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalArticles: 0,
    totalSubscribers: 0,
    subscribersThisMonth: 0,
    recentArticles: []
  });

  useEffect(() => {
    checkAuthAndLoadStats();
  }, []);

  const checkAuthAndLoadStats = async () => {
    try {
      // Check authentication
      const authResponse = await fetch('/api/auth/check');
      if (!authResponse.ok) {
        router.push('/admin/login');
        return;
      }

      // Load stats
      const statsResponse = await fetch('/api/admin/stats');
      if (statsResponse.ok) {
        const data = await statsResponse.json();
        setStats(data);
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <AdminDashboard stats={stats} />;
}
