# 🚀 Production Deployment Checklist

This document contains the **critical steps** you must complete before deploying TechFrag to production.

---

## ✅ Critical Tasks (Must Complete Before Launch)

### 1. Set Production Environment Variables

Go to your hosting provider's dashboard (Vercel, Netlify, Railway, etc.) and set these environment variables:

```bash
# Database - Your production PostgreSQL connection string
DATABASE_URL="postgresql://user:password@host:port/database"

# Email - Get from https://resend.com/api-keys
RESEND_API_KEY="re_your_actual_api_key_here"

# Session Security - Generate with: openssl rand -hex 32
SESSION_SECRET="your_long_random_secret_string_here"

# Public URL - Your production domain
NEXT_PUBLIC_BASE_URL="https://www.yourdomain.com"

# Environment
NODE_ENV="production"
```

**Important:** Never commit your `.env` file to version control!

---

### 2. Reset Your Admin Password

Since we upgraded the password hashing system from SHA-256 to bcrypt, your existing admin password will no longer work.

**Run this command to set a new password:**

```bash
npx ts-node scripts/reset-admin-password.ts admin your_new_secure_password
```

Replace `admin` with your admin username and `your_new_secure_password` with a strong password (minimum 8 characters).

---

### 3. Verify Your Email Domain with Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add and verify your domain (e.g., `yourdomain.com`)
3. Add the required DNS records (SPF, DKIM, DMARC)
4. Wait for verification (usually takes a few minutes)
5. Update the `from` email address in `lib/email.ts`:
   - Change `newsletter@your-verified-domain.com` to your actual verified domain
   - Example: `newsletter@yourdomain.com`

**Why this matters:** Without a verified domain, your emails will be sent from `onboarding@resend.dev` and may land in spam folders.

---

### 4. Run Database Migrations

On your production server, run:

```bash
npx prisma migrate deploy
```

This ensures your database schema is up to date.

---

## 🟡 High-Priority Tasks (Strongly Recommended)

### 5. Test Your Email Setup

Before publishing articles, test that emails are being sent correctly:

1. Add a test subscriber (use your own email)
2. Publish a test article from the admin dashboard
3. Verify you receive the newsletter email
4. Check that links work and formatting looks correct

---

### 6. Add Security Headers (Optional but Recommended)

Add these headers to your `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 🔒 Security Features Already Implemented

✅ **Password Hashing:** Using bcrypt with 12 salt rounds
✅ **Session Management:** Stateless JWTs with httpOnly, secure cookies
✅ **Brute-Force Protection:** Account lockout after 5 failed login attempts (15-minute timeout)
✅ **XSS Protection:** HTML content is sanitized with DOMPurify before rendering
✅ **API Key Safety:** Resend client only initialized when API key is present
✅ **Environment Variables:** All secrets use environment variables (not hardcoded)

---

## 📝 Post-Launch Tasks

- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure database backups
- [ ] Set up uptime monitoring
- [ ] Create a backup admin account
- [ ] Document your admin workflows

---

## 🆘 Troubleshooting

### Admin login not working after deployment?

- Make sure you ran the password reset script
- Verify `SESSION_SECRET` is set in production environment
- Check that `NODE_ENV` is set to `production`

### Emails not sending?

- Verify `RESEND_API_KEY` is set correctly
- Check that your domain is verified in Resend
- Update the `from` address in `lib/email.ts` to use your verified domain

### Database connection errors?

- Verify `DATABASE_URL` is correct
- Run `npx prisma migrate deploy` on production
- Check that your database server is accessible

---

## 🎉 Ready to Launch?

Once you've completed all the critical tasks above, your TechFrag newsletter is ready for production!

**Final verification:**

```bash
# Run these commands locally to verify everything compiles
npm run build
npx tsc --noEmit
```

If both commands succeed, you're good to deploy! 🚀
