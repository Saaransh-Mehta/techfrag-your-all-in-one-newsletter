# Resend Email Setup Guide

This guide will help you set up Resend for sending newsletter emails.

## Step 1: Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click **Sign Up** (free tier includes 100 emails/day)
3. Verify your email address

## Step 2: Get API Key

1. Log into Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "TechFrag Newsletter")
5. Copy the API key (starts with `re_`)

## Step 3: Add to Environment Variables

Add the API key to your `.env` file:

```env
RESEND_API_KEY="re_xxxxxxxxxxxx"
```

## Step 4: (Optional) Set Up Custom Domain

By default, emails are sent from `onboarding@resend.dev`. To use your own domain:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `techfrag.com`)
4. Add the DNS records shown to your domain provider
5. Wait for verification (usually a few minutes)
6. Update `lib/email.ts` to use your domain:

```typescript
from: 'TechFrag Newsletter <newsletter@yourdomain.com>',
```

## Testing Email Delivery

### Test Subscription Form

1. Visit your homepage at `http://localhost:3000`
2. Scroll to the subscription form
3. Enter your email address
4. Click **Subscribe Now**
5. Check your database to verify the subscriber was added:
   ```bash
   npx prisma studio
   ```

### Test Newsletter Email

1. Go to `/admin/login` and login
2. Create a new article
3. Click **Publish Article**
4. Check the terminal for logs:
   ```
   Sending newsletter to X subscribers...
   Processing batch 1/Y (25 emails)...
   ✓ Batch 1 sent successfully
   Newsletter delivery complete: X sent, 0 failed
   ```
5. Check your inbox for the newsletter email

## Email Batching Details

The system sends emails in batches to comply with rate limits:

- **Batch Size**: 25 emails per batch
- **Delay Between Batches**: 1 second
- **Processing**: Sequential (one batch completes before next starts)
- **Error Handling**: Failed batches are logged but don't stop other batches

### Example for 100 Subscribers

- 4 batches total (25 + 25 + 25 + 25)
- Total time: ~4 seconds
- All emails use the same beautiful HTML template

## Free Tier Limits

Resend free tier includes:

- **100 emails per day**
- **3,000 emails per month**
- Full access to API
- No credit card required

For production with more subscribers, consider upgrading to a paid plan.

## Troubleshooting

### Emails Not Sending

1. Check API key is correct in `.env`
2. Verify environment variable is loaded: `console.log(process.env.RESEND_API_KEY)`
3. Check terminal for error messages
4. Ensure you have active subscribers in database

### Emails Going to Spam

1. Use a custom domain (improves deliverability)
2. Add SPF and DKIM records in DNS
3. Warm up your domain (send to engaged users first)
4. Avoid spam trigger words in content

### Rate Limit Errors

1. Increase delay between batches (change from 1000ms to 2000ms)
2. Reduce batch size (change from 25 to 10)
3. Consider upgrading Resend plan

## Customizing Email Template

The email template is in `lib/email.ts` in the `generateNewsletterEmail()` function.

You can customize:

- Colors and styling
- Layout structure
- Logo and branding
- Footer content
- Unsubscribe link

Example: Change header color:

```typescript
<td style="background-color: #1a1a1a; padding: 30px; text-align: center;">
```

## Production Checklist

Before deploying to production:

- [ ] Set up custom domain in Resend
- [ ] Add DNS records (SPF, DKIM, DMARC)
- [ ] Update `from` email address in `lib/email.ts`
- [ ] Set `NEXT_PUBLIC_BASE_URL` to your production URL
- [ ] Test with a small group of subscribers first
- [ ] Monitor delivery rates in Resend dashboard
- [ ] Implement unsubscribe functionality (currently just a link)
- [ ] Consider adding email preferences (frequency, topics)

## Additional Features to Consider

1. **Welcome Email**: Send a welcome email when users subscribe
2. **Email Digest**: Send weekly digest instead of per-article
3. **Email Analytics**: Track opens and clicks via Resend
4. **A/B Testing**: Test different subject lines and content
5. **Segmentation**: Send to specific subscriber groups
6. **Scheduled Sends**: Schedule newsletters for optimal times

## Support

- Resend Docs: [https://resend.com/docs](https://resend.com/docs)
- Resend Support: support@resend.com
- Check Resend status: [https://status.resend.com](https://status.resend.com)
