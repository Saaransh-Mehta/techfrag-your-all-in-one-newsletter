# TechFrag Newsletter

A modern, responsive newsletter website built with Next.js 14, TypeScript, and Tailwind CSS v4.

## Features

✅ **Newsletter Landing Page**

- Featured article showcase
- Grid layout for latest news articles
- Email subscription form with validation
- Responsive design for all devices

✅ **Dynamic News Article Pages**

- Individual pages for each news article
- Right sidebar with latest news
- Breadcrumb navigation
- Social sharing buttons
- Rich content formatting

✅ **Consistent Layout**

- Header with navigation
- Footer with social links
- Sticky navigation
- Smooth scrolling

✅ **Newsletter Subscription**

- Email capture form on landing page
- Call-to-action on article pages
- Subscription success/error states

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist Sans & Geist Mono
- **Image Optimization**: Next.js Image component
- **Database**: Ready for Prisma integration (PostgreSQL)

## Project Structure

```
techfrag/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page with featured news & subscription
│   ├── globals.css         # Global styles
│   └── news/
│       └── [id]/
│           ├── page.tsx    # Dynamic news article page
│           └── not-found.tsx
├── components/
│   ├── Header.tsx          # Main navigation
│   ├── Footer.tsx          # Footer with links
│   ├── NewsCard.tsx        # News article card component
│   ├── Sidebar.tsx         # Sidebar with latest news
│   └── SubscriptionForm.tsx # Email subscription form
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   └── mockData.ts         # Sample news data
└── public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Routes

- `/` - Landing page with featured articles and subscription form
- `/news/[id]` - Individual news article pages (e.g., `/news/1`)
- `/#subscribe` - Jump to subscription section
- `/#latest` - Jump to latest news section

## Key Features Explained

### Landing Page (`/`)

- **Featured Article**: Large hero section showcasing the main story
- **Email Subscription**: Prominent form to capture newsletter subscribers
- **Latest News Grid**: 6 most recent articles in a responsive grid
- **Stats Section**: Newsletter metrics and engagement numbers

### News Article Page (`/news/[id]`)

- **Full Article Content**: Rich HTML content with proper formatting
- **Author Information**: Author details with avatar
- **Reading Time**: Estimated time to read the article
- **Right Sidebar**: Shows 5 latest articles excluding current one
- **Share Buttons**: Social media sharing options
- **Subscription CTA**: Encourages readers to subscribe

### Components

#### NewsCard

Reusable component for displaying news articles in two modes:

- **Featured**: Large hero card with overlay
- **Grid**: Compact card for grid layouts

#### SubscriptionForm

Interactive email subscription form with:

- Loading states
- Success/error messages
- Email validation
- Responsive design

#### Sidebar

Displays latest news with:

- Thumbnail images
- Article titles
- Publication dates
- Direct links to articles

## Customization

### Adding Real Data

Replace the mock data in `lib/mockData.ts` with API calls or database queries:

```typescript
// lib/api.ts
export async function getNewsById(id: string) {
  const response = await fetch(`/api/news/${id}`);
  return response.json();
}
```

### Implementing Email Subscription

Update `components/SubscriptionForm.tsx` to connect to your backend:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  // Handle response...
};
```

## Database Integration

The project includes Prisma setup. To use a database:

1. Set up your `.env` file:

   ```
   DATABASE_URL="postgresql://..."
   ```

2. Create a Prisma schema in `prisma/schema.prisma`:

   ```prisma
   model Article {
     id          String   @id @default(cuid())
     title       String
     excerpt     String
     content     String
     author      String
     publishedAt DateTime
     category    String
     imageUrl    String
     readTime    Int
   }

   model Subscriber {
     id           String   @id @default(cuid())
     email        String   @unique
     subscribedAt DateTime @default(now())
   }
   ```

3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms

Build the production version:

```bash
npm run build
npm start
```

## Future Enhancements

- [ ] Add search functionality
- [ ] Implement category filtering
- [ ] Add pagination for news list
- [ ] Create admin dashboard for content management
- [ ] Integrate email service provider (SendGrid, Mailchimp)
- [ ] Add comments section
- [ ] Implement dark mode toggle
- [ ] Add RSS feed
- [ ] SEO optimization with meta tags per article

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your newsletter needs!

---

Built with ❤️ using Next.js and Tailwind CSS
