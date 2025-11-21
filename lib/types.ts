export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  category: string;
  imageUrl: string;
  readTime: number; // in minutes
}

export interface Subscriber {
  email: string;
  subscribedAt: Date;
}
