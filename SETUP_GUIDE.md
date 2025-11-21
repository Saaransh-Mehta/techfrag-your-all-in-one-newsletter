# TechFrag Newsletter - Complete Setup Guide

## 🎉 Features Implemented

✅ **Admin Authentication System**

- Login page with username/password
- Session-based authentication
- Protected admin routes

✅ **Database Integration (PostgreSQL + Prisma)**

- User management
- News article CRUD operations
- Real-time data from database

✅ **Admin Panel**

- Create and publish news articles
- Rich HTML content editor
- Category selection
- Image URL management
- Read time estimation

✅ **Public Newsletter Website**

- Dynamic landing page with featured article
- Latest news grid
- Individual article pages with sidebar
- Email subscription form with database integration
- Responsive design
- Professional 2-color theme (Slate + Orange)

✅ **Email Newsletter System**

- Email subscription management
- Automated newsletter emails on article publish
- Batch email sending (25 emails per batch)
- Beautiful HTML email templates
- Powered by Resend

## 🔐 Admin Access

**Access the admin panel at:** `http://localhost:3000/admin/login`

> ⚠️ **Note**: You need to create an admin user in your database first. See "Creating Admin User" section below.

## 🗄️ Database Setup

The application is connected to a PostgreSQL database (Neon) with the following structure:

### Tables:

1. **User** - Admin users with authentication

   - id, username, password (hashed), createdAt, updatedAt

2. **NewsArticle** - News articles

   - id, title, excerpt, content, author, publishedAt, category, imageUrl, readTime, createdAt, updatedAt

3. **Subscriber** - Email subscribers
   - id, email (unique), isActive, subscribedAt, updatedAt

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="your_postgresql_connection_string_here"
RESEND_API_KEY="re_xxxxxxxxxxxx"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

**Getting Resend API Key:**

1. Sign up at [https://resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Copy and paste it into your `.env` file

### 3. Run Database Migrations

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Create Admin User

Run this command to create your admin user:

```bash
# Replace YOUR_USERNAME and YOUR_PASSWORD with your desired credentials
npx prisma db execute --stdin <<< "INSERT INTO \"User\" (id, username, password, \"createdAt\", \"updatedAt\") VALUES (gen_random_uuid(), 'YOUR_USERNAME', encode(sha256('YOUR_PASSWORD'::bytea), 'hex'), NOW(), NOW());"
```

### 5. Run the Development Server

```bash
npm run dev
```

### 6. Access the Application

- **Public Site:** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
- **Admin Panel:** http://localhost:3000/admin (requires login)

## 📝 How to Use

### Creating News Articles

1. Go to `http://localhost:3000/admin/login`
2. Login with your admin credentials
3. Fill in the form:

   - **Title**: The main headline
   - **Excerpt**: Brief summary (shown in cards)
   - **Content**: Full article in HTML format
     ```html
     <p>Your paragraph here...</p>
     <h2>Section Heading</h2>
     <p>More content...</p>
     ```
   - **Author**: Author name
   - **Category**: Select from dropdown
   - **Image URL**: Use Unsplash or any image URL
   - **Read Time**: Estimated minutes to read

4. Click "Publish Article"
5. Article will appear on the homepage immediately!

### Sample Image URLs (Unsplash)

```
https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop
https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=450&fit=crop
https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop
https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/logout` - Logout current session
- `GET /api/auth/check` - Check authentication status

### News Articles

- `GET /api/news` - Get all articles (public)
- `POST /api/news` - Create article (requires auth, triggers newsletter emails)
- `GET /api/news/[id]` - Get single article (public)
- `PUT /api/news/[id]` - Update article (requires auth)
- `DELETE /api/news/[id]` - Delete article (requires auth)

### Subscriptions

- `POST /api/subscribe` - Subscribe to newsletter (public)

## 📧 Email Newsletter System

### How It Works

1. **User subscribes** via the subscription form on the homepage
2. Email is saved to the `Subscriber` table in the database
3. When admin **publishes a new article**, the system:
   - Creates the article in the database
   - Fetches all active subscribers
   - Sends emails in **batches of 25** to avoid rate limits
   - Each batch is sent sequentially with 1-second delay
4. Subscribers receive a beautiful HTML email with:
   - Article title and excerpt
   - Featured image
   - Category badge
   - Read time
   - "Read Full Article" button linking to the website

### Email Batching

- **Batch Size**: 25 emails per batch
- **Processing**: Sequential (one batch at a time)
- **Rate Limiting**: 1-second delay between batches
- **Error Handling**: Failed batches are logged but don't stop the process
- **Background Processing**: Emails sent asynchronously after article creation

### Email Template Features

- Responsive HTML design
- Matches website branding (Slate + Orange theme)
- Mobile-friendly layout
- Unsubscribe link in footer
- Professional formatting with images

## 📁 Project Structure

```
techfrag/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx        # Admin login page
│   │   └── page.tsx              # Admin dashboard (protected)
│   ├── api/
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── check/route.ts
│   │   ├── subscribe/           # Newsletter subscription
│   │   │   └── route.ts
│   │   └── news/                 # News CRUD endpoints
│   │       ├── route.ts          # GET all, POST new
│   │       └── [id]/route.ts     # GET, PUT, DELETE by ID
│   ├── news/[id]/page.tsx        # Dynamic news article pages
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   ├── Header.tsx                # Navigation (admin link hidden)
│   ├── Footer.tsx
│   ├── NewsCard.tsx             # Article card component
│   ├── Sidebar.tsx              # Latest news sidebar
│   └── SubscriptionForm.tsx     # Email subscription
├── lib/
│   ├── prisma.ts                # Prisma client instance
│   ├── auth.ts                  # Auth utilities
│   ├── email.ts                 # Email service with Resend
│   └── types.ts                 # TypeScript interfaces
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
└── .env                         # Environment variables
```

## 🎨 Design System

**Color Palette:**

- Primary (Slate): `#0f172a`, `#1e293b`, `#334155`
- Accent (Orange): `#f97316`, `#ea580c`
- Background: `#f8fafc` (light gray)
- White: Cards and content areas
- Borders: `#e2e8f0`

**Typography:**

- Font: Geist Sans (modern, clean)
- Headers: Bold, dark slate
- Body: Regular, slate-600

## 🔒 Security Notes

**Current Implementation (Development):**

- Simple SHA-256 password hashing
- In-memory session storage
- Basic authentication

**For Production:**

- Use bcrypt or argon2 for password hashing
- Use Redis or database for session storage
- Add CSRF protection
- Implement rate limiting
- Add input validation and sanitization
- Use HTTPS only
- Add role-based access control

## 🐛 Troubleshooting

### Database Connection Issues

If you see database connection errors:

```bash
# Check environment variables
cat .env

# Regenerate Prisma Client
npx prisma generate

# Reset database (caution: deletes all data)
npx prisma migrate reset
```

### Admin Login Issues

If you can't login:

```bash
# Check if admin user exists
npx prisma studio

# Or re-create admin user with new password
npx prisma db execute --stdin <<< "DELETE FROM \"User\" WHERE username = 'YOUR_USERNAME';"
npx prisma db execute --stdin <<< "INSERT INTO \"User\" (id, username, password, \"createdAt\", \"updatedAt\") VALUES (gen_random_uuid(), 'YOUR_USERNAME', encode(sha256('YOUR_PASSWORD'::bytea), 'hex'), NOW(), NOW());"
```

### No Articles Showing

If the homepage is empty:

1. Login to admin panel
2. Create at least one article
3. Refresh the homepage

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma 7
- **Styling**: Tailwind CSS v4
- **Authentication**: Custom session-based
- **Image Host**: Unsplash (or any image CDN)

## 🚀 Deployment

### Environment Variables Needed

```env
DATABASE_URL="your_postgresql_connection_string"
NODE_ENV="production"
```

### Build Commands

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Future Enhancements

- [ ] Image upload functionality
- [ ] Rich text WYSIWYG editor
- [ ] Article drafts
- [ ] Article editing/deletion UI
- [ ] User roles (admin, editor, author)
- [ ] Email service integration for newsletter
- [ ] Analytics dashboard
- [ ] Comment system
- [ ] Search functionality
- [ ] Category filtering
- [ ] Pagination

---

**Created with ❤️ for TechFrag Newsletter**

For support or questions, check the code comments or API responses for error details.
