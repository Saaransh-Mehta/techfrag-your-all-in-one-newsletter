# Email Setup Guide for TechFrag Newsletter

## Current Status: Development Mode ⚠️

Your emails are currently working in **development mode**, which means:

- ✅ Email functionality is working
- ✅ Resend API is configured correctly
- ⚠️ Emails can only be sent to `delivered@resend.dev` (test recipient)
- ⚠️ Real subscribers won't receive emails yet

## Why Emails Aren't Being Sent to Real Subscribers

Resend's free testing domain (`onboarding@resend.dev`) has restrictions:

- Can only send to: `delivered@resend.dev`
- Cannot send to real email addresses like Gmail, Outlook, etc.
- This is to prevent spam and ensure deliverability

## Solution: Verify Your Own Domain

To send emails to your real subscribers, you need to verify a domain with Resend.

### Step 1: Get a Domain

You need a domain name (e.g., `techfrag.com`, `mynewsletter.io`, etc.)

**Options:**

- Use an existing domain you own
- Buy a domain from:
  - Namecheap (~$10/year)
  - GoDaddy
  - Google Domains
  - Cloudflare

### Step 2: Add Domain to Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain (e.g., `techfrag.com`)
4. Resend will provide DNS records to add

### Step 3: Add DNS Records

Add these DNS records to your domain provider:

**Example records (Resend will provide exact values):**

```
Type: TXT
Name: @
Value: resend-verification=abc123xyz...

Type: MX
Name: @
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rfc=simple...
```

**Common DNS Providers:**

- **Namecheap:** Domain List → Manage → Advanced DNS → Add New Record
- **Cloudflare:** DNS → Add Record
- **GoDaddy:** DNS → Manage DNS → Add Record

### Step 4: Verify Domain

1. After adding DNS records, wait 5-10 minutes
2. In Resend dashboard, click **"Verify"**
3. Status should change to **"Verified" ✅**

### Step 5: Update Code

Once domain is verified, update the email sender in `/lib/email.ts`:

**Replace:**

```typescript
from: "TechFrag Newsletter <onboarding@resend.dev>";
```

**With:**

```typescript
from: "TechFrag Newsletter <newsletter@yourdomain.com>";
```

For example:

```typescript
from: "TechFrag Newsletter <newsletter@techfrag.com>";
```

## Testing Without a Domain

You can test the email system without a domain:

1. **Check console logs** - Emails are being "sent" to `delivered@resend.dev`
2. **Check Resend Dashboard** - View logs at https://resend.com/emails
3. **Run test script:**
   ```bash
   node test-email.js
   ```

## Current Configuration

- ✅ **API Key:** Configured (`RESEND_API_KEY` in `.env`)
- ✅ **Newsletter Template:** Beautiful HTML email
- ✅ **Welcome Email:** Automatic on subscription
- ✅ **Batch Processing:** 25 emails per batch
- ✅ **Subscribers:** 2 active subscribers in database
- ⚠️ **Domain:** Using test domain (needs verification)

## After Domain Verification

Once you verify your domain, emails will be sent to real subscribers automatically:

1. **Welcome Email:** Sent immediately when someone subscribes
2. **Newsletter Email:** Sent when you publish a new article
3. **All subscribers:** Will receive emails at their real email addresses

## Recommended Domains for Newsletter

Good sender email examples:

- `newsletter@yourdomain.com` ✅
- `news@yourdomain.com` ✅
- `noreply@yourdomain.com` ✅
- `hello@yourdomain.com` ✅

Avoid:

- `admin@yourdomain.com` ❌ (not for newsletters)
- `test@yourdomain.com` ❌ (looks unprofessional)

## Cost

- **Resend Free Tier:**

  - 3,000 emails/month
  - 100 emails/day
  - Perfect for starting out

- **Paid Plans:**
  - $20/month for 50,000 emails
  - Good deliverability rates

## Need Help?

- Resend Documentation: https://resend.com/docs
- Resend Support: https://resend.com/support
- DNS Help: Contact your domain provider

## Quick Start Checklist

- [ ] Buy a domain name
- [ ] Add domain to Resend
- [ ] Configure DNS records
- [ ] Verify domain in Resend
- [ ] Update `from` address in code
- [ ] Test with real subscribers
- [ ] Monitor email deliverability

---

**Current Mode:** Development (emails sent to test recipient)
**Goal:** Production (emails sent to real subscribers)
**Blocker:** Need to verify a custom domain with Resend
