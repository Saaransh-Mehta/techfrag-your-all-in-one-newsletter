export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date | string; // Date object on server, ISO string on client
  category: string;
  imageUrl: string;
  readTime: number; // in minutes
}

export interface Subscriber {
  email: string;
  subscribedAt: Date | string; // Date object on server, ISO string on client
}
