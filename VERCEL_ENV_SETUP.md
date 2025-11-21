# Vercel Environment Variables Setup

## 🚨 CRITICAL: Your email service isn't working because environment variables are missing in Vercel!

### Step-by-Step Guide:

1. **Go to Vercel Dashboard:**

   - Visit: https://vercel.com/dashboard
   - Select your project: `techfrag-your-all-in-one-newsletter`

2. **Navigate to Settings:**

   - Click on "Settings" tab
   - Click on "Environment Variables" in the sidebar

3. **Add These Variables:**

   | Variable Name          | Value                                                                                                                                                  | Environment                      |
   | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
   | `DATABASE_URL`         | `postgresql://neondb_owner:npg_p1FGi2SlTtfN@ep-hidden-dust-adeu5zv5-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` | Production, Preview, Development |
   | `RESEND_API_KEY`       | `re_XMirAPgA_FnSVvGq1zdzaBB14iuA53TmN`                                                                                                                 | Production, Preview, Development |
   | `NEXT_PUBLIC_BASE_URL` | `https://techfrag-your-all-in-one-newsletter.vercel.app`                                                                                               | Production, Preview, Development |
   | `SESSION_SECRET`       | `your-super-secret-key-change-this-in-production-minimum-32-characters-long`                                                                           | Production, Preview, Development |
   | `NODE_ENV`             | `production`                                                                                                                                           | Production only                  |

4. **After Adding Variables:**
   - Click "Redeploy" from the Deployments tab
   - OR push a new commit to trigger automatic deployment

## ⚠️ Important Notes:

### About Resend Email Service:

**Current Setup (Development Mode):**

- Your Resend account is using the free tier with `onboarding@resend.dev`
- **Limitation:** Can ONLY send emails to `delivered@resend.dev` (Resend's test inbox)
- This means subscribers won't receive emails to their actual addresses

**To Fix This for Production:**

1. **Verify Your Own Domain:**
   - Go to: https://resend.com/domains
   - Click "Add Domain"
   - Add your domain (e.g., `techfrag.com` or any domain you own)
   - Follow DNS setup instructions (add TXT, MX, and DKIM records)
2. **Update Email Service:**

   - After domain verification, update the "from" address in `/lib/email.ts`
   - Change from: `onboarding@resend.dev`
   - To: `newsletter@yourdomain.com`

3. **Without Domain Verification:**
   - Emails will only go to `delivered@resend.dev` (for testing)
   - You can check test emails at: https://resend.com/emails
   - Real subscribers won't receive anything

### Current Status:

✅ API Key is configured  
✅ Email templates are ready  
✅ Subscription logic works  
❌ Domain NOT verified (emails only go to test inbox)  
❌ Environment variables NOT in Vercel (production broken)

## Quick Test After Setup:

1. Add the environment variables to Vercel
2. Redeploy your app
3. Try subscribing with an email on your website
4. Check Resend dashboard: https://resend.com/emails
5. You should see the welcome email sent to `delivered@resend.dev`

## Need Help?

If emails still don't work after setup:

- Check Vercel deployment logs
- Check Resend dashboard for errors
- Verify all environment variables are set correctly
- Ensure RESEND_API_KEY is valid (test at https://resend.com/api-keys)
