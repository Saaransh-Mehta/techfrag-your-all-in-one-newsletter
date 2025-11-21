# TechFrag Newsletter

A modern newsletter platform built with Next.js, featuring an admin panel for content management and a clean, professional design.

## Features

- 📰 Dynamic newsletter landing page
- 📝 Admin panel for creating and managing articles
- 🔐 Secure authentication system
- 📧 Automated email newsletter system with Resend
- ✉️ Batch email processing (25 emails per batch)
- 👥 Subscriber management
- 🎨 Professional 2-color design (Slate + Orange)
- 📱 Fully responsive layout
- 🗄️ PostgreSQL database with Prisma ORM

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma 5
- **Styling**: Tailwind CSS v4
- **Authentication**: Session-based with SHA-256
- **Email Service**: Resend

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd techfrag
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_postgresql_connection_string"
```

You can get a free PostgreSQL database from:

- [Neon](https://neon.tech) (Recommended)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

### 4. Set up the database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Create your admin user (replace YOUR_USERNAME and YOUR_PASSWORD)
npx prisma db execute --stdin <<< "INSERT INTO \"User\" (id, username, password, \"createdAt\", \"updatedAt\") VALUES (gen_random_uuid(), 'YOUR_USERNAME', encode(sha256('YOUR_PASSWORD'::bytea), 'hex'), NOW(), NOW());"
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your newsletter!

## Admin Panel

Access the admin panel at `/admin/login` to create and manage articles.

**When you publish an article**, the system automatically:

- Saves it to the database
- Sends newsletter emails to all subscribers
- Processes emails in batches of 25 to avoid rate limits

## Email Newsletter

Users can subscribe via the form on the homepage. When an admin publishes a new article, all active subscribers receive a beautiful HTML email with:

- Article title and excerpt
- Featured image
- Category badge
- Direct link to read more

## Project Structure

```
techfrag/
├── app/
│   ├── admin/           # Admin panel pages
│   ├── api/             # API routes
│   ├── news/[id]/       # Dynamic article pages
│   └── page.tsx         # Landing page
├── components/          # Reusable components
├── lib/                 # Utilities and Prisma client
├── prisma/             # Database schema and migrations
└── public/             # Static assets
```

## Database Schema

### User Table

- Admin users with authentication

### NewsArticle Table

- title, excerpt, content
- author, category
- publishedAt, readTime
- imageUrl

### Subscriber Table

- email (unique)
- isActive
- subscribedAt

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check auth status

### News Articles

- `GET /api/news` - Get all articles
- `POST /api/news` - Create article (auth required, triggers newsletter emails)
- `GET /api/news/[id]` - Get single article
- `PUT /api/news/[id]` - Update article (auth required)
- `DELETE /api/news/[id]` - Delete article (auth required)

### Subscriptions

- `POST /api/subscribe` - Subscribe to newsletter

## Development

- **Database UI**: Run `npx prisma studio` to view/edit data
- **Migrations**: Run `npx prisma migrate dev` after schema changes
- **Type Generation**: Run `npx prisma generate` to update types

## Deployment

### Environment Variables

Set these in your hosting platform:

```env
DATABASE_URL="your_postgresql_connection_string"
NODE_ENV="production"
```

### Build Commands

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
npm start
```

## Security Notes

⚠️ **Important**:

- Never commit `.env` file to Git
- Change default admin credentials in production
- Use strong passwords
- Enable HTTPS in production

## License

MIT

---

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)
