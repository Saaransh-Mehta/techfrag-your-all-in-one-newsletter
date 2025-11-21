import { Resend } from 'resend';
import { prisma } from './prisma';

// Validate API key exists
if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️ RESEND_API_KEY not found in environment variables. Email functionality will not work.');
}

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build');

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  imageUrl: string;
  readTime: number;
}

/**
 * Generates HTML email template for newsletter
 */
function generateNewsletterEmail(article: NewsArticle): string {
  const articleUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/news/${article.id}`;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Article: ${article.title}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background-color: #0f172a; padding: 30px; text-align: center;">
                    <h1 style="color: #f97316; margin: 0; font-size: 28px; font-weight: bold;">TechFrag</h1>
                    <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 14px;">Latest Tech News & Insights</p>
                  </td>
                </tr>
                
                <!-- Article Image -->
                <tr>
                  <td style="padding: 0;">
                    <img src="${article.imageUrl}" alt="${article.title}" style="width: 100%; height: 300px; object-fit: cover; display: block;" />
                  </td>
                </tr>
                
                <!-- Article Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <div style="background-color: #f97316; display: inline-block; padding: 6px 12px; border-radius: 4px; margin-bottom: 16px;">
                      <span style="color: #ffffff; font-size: 12px; font-weight: 600; text-transform: uppercase;">${article.category}</span>
                    </div>
                    
                    <h2 style="color: #0f172a; margin: 0 0 16px 0; font-size: 24px; line-height: 1.4;">
                      ${article.title}
                    </h2>
                    
                    <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
                      ${article.excerpt}
                    </p>
                    
                    <div style="margin-bottom: 24px;">
                      <span style="color: #334155; font-size: 14px;">By ${article.author}</span>
                      <span style="color: #94a3b8; margin: 0 8px;">•</span>
                      <span style="color: #334155; font-size: 14px;">${article.readTime} min read</span>
                    </div>
                    
                    <a href="${articleUrl}" style="display: inline-block; background-color: #f97316; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Read Full Article
                    </a>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #64748b; margin: 0 0 12px 0; font-size: 14px;">
                      You're receiving this because you subscribed to TechFrag Newsletter
                    </p>
                    <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                      © ${new Date().getFullYear()} TechFrag. All rights reserved.
                    </p>
                    <p style="margin: 12px 0 0 0;">
                      <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/unsubscribe" style="color: #94a3b8; font-size: 12px; text-decoration: underline;">
                        Unsubscribe
                      </a>
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/**
 * Generates HTML welcome email template
 */
function generateWelcomeEmail(): string {
  const homeUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to TechFrag Newsletter!</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background-color: #0f172a; padding: 40px 30px; text-align: center;">
                    <h1 style="color: #f97316; margin: 0 0 10px 0; font-size: 32px; font-weight: bold;">Welcome to TechFrag! 🎉</h1>
                    <p style="color: #e2e8f0; margin: 0; font-size: 16px;">Your Gateway to Tech News & Insights</p>
                  </td>
                </tr>
                
                <!-- Welcome Message -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 24px; line-height: 1.4;">
                      Thank You for Subscribing! 👋
                    </h2>
                    
                    <p style="color: #334155; margin: 0 0 16px 0; font-size: 16px; line-height: 1.6;">
                      We're thrilled to have you join our community of tech enthusiasts! You've successfully subscribed to TechFrag Newsletter.
                    </p>
                    
                    <p style="color: #334155; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
                      From now on, you'll receive notifications whenever we publish fresh content covering:
                    </p>
                    
                    <table style="margin: 0 0 24px 0; width: 100%;">
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #f97316; font-size: 20px; margin-right: 12px;">🚀</span>
                          <span style="color: #334155; font-size: 16px;">Technology Trends & Innovation</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #f97316; font-size: 20px; margin-right: 12px;">💻</span>
                          <span style="color: #334155; font-size: 16px;">Programming & Development</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #f97316; font-size: 20px; margin-right: 12px;">🤖</span>
                          <span style="color: #334155; font-size: 16px;">AI & Machine Learning</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #f97316; font-size: 20px; margin-right: 12px;">🔒</span>
                          <span style="color: #334155; font-size: 16px;">Cybersecurity & Privacy</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <span style="color: #f97316; font-size: 20px; margin-right: 12px;">📱</span>
                          <span style="color: #334155; font-size: 16px;">Mobile & Web Technologies</span>
                        </td>
                      </tr>
                    </table>
                    
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #f97316;">
                      <p style="color: #334155; margin: 0; font-size: 14px; line-height: 1.6;">
                        <strong style="color: #0f172a;">Pro Tip:</strong> Add our email address to your contacts to ensure you never miss an update!
                      </p>
                    </div>
                    
                    <a href="${homeUrl}" style="display: inline-block; background-color: #f97316; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; margin-bottom: 16px;">
                      Visit TechFrag Now
                    </a>
                    
                    <p style="color: #64748b; margin: 24px 0 0 0; font-size: 14px; line-height: 1.6;">
                      Have questions or feedback? We'd love to hear from you!
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #64748b; margin: 0 0 12px 0; font-size: 14px;">
                      You're receiving this because you subscribed to TechFrag Newsletter
                    </p>
                    <p style="color: #94a3b8; margin: 0; font-size: 12px;">
                      © ${new Date().getFullYear()} TechFrag. All rights reserved.
                    </p>
                    <p style="margin: 12px 0 0 0;">
                      <a href="${homeUrl}/unsubscribe" style="color: #94a3b8; font-size: 12px; text-decoration: underline;">
                        Unsubscribe
                      </a>
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/**
 * Sends newsletter emails to subscribers in batches of 25
 */
export async function sendNewsletterToSubscribers(article: NewsArticle): Promise<void> {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Cannot send emails: RESEND_API_KEY not configured');
      return;
    }

    // Get all active subscribers
    const subscribers = await prisma.subscriber.findMany({
      where: { isActive: true },
      select: { email: true }
    });

    if (subscribers.length === 0) {
      console.log('No active subscribers to send newsletter to');
      return;
    }

    console.log(`Sending newsletter to ${subscribers.length} subscribers...`);

    // DEVELOPMENT MODE: Using onboarding@resend.dev can only send to delivered@resend.dev
    // For production, verify your own domain in Resend dashboard
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const testRecipient = 'delivered@resend.dev';
    
    if (isDevelopment) {
      console.warn('⚠️  DEVELOPMENT MODE: Emails will be sent to test recipient (delivered@resend.dev)');
      console.warn('⚠️  To send to real subscribers, verify your domain at https://resend.com/domains');
    }

    // Batch subscribers into groups of 25
    const BATCH_SIZE = 25;
    const batches: string[][] = [];
    
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE).map(s => 
        isDevelopment ? testRecipient : s.email
      );
      batches.push(batch);
    }

    const emailHtml = generateNewsletterEmail(article);

    // Process batches sequentially to avoid rate limits
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`Processing batch ${i + 1}/${batches.length} (${batch.length} emails)...`);

      try {
        // In development, send individual emails to avoid duplicates
        if (isDevelopment) {
          // Just send one test email instead of multiple to the same address
          const result = await resend.emails.send({
            from: 'TechFrag Newsletter <onboarding@resend.dev>',
            to: testRecipient,
            subject: `📰 [TEST] New Article: ${article.title}`,
            html: emailHtml,
          });
          
          console.log(`Test email result:`, JSON.stringify(result, null, 2));
          successCount = subscribers.length; // Count all subscribers as notified (in test mode)
        } else {
          // Production: Send batch of emails
          const results = await resend.batch.send(
            batch.map(email => ({
              from: 'TechFrag Newsletter <noreply@yourdomain.com>', // Update with your verified domain
              to: email,
              subject: `📰 New Article: ${article.title}`,
              html: emailHtml,
            }))
          );
          
          console.log(`Batch ${i + 1} results:`, JSON.stringify(results, null, 2));
          successCount += batch.length;
        }

        console.log(`✓ Batch ${i + 1} sent successfully`);

        // Add small delay between batches to respect rate limits
        if (i < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        errorCount += batch.length;
        console.error(`✗ Error sending batch ${i + 1}:`, error);
      }
    }

    console.log(`Newsletter delivery complete: ${successCount} sent, ${errorCount} failed`);
  } catch (error) {
    console.error('Error sending newsletter:', error);
    throw error;
  }
}

/**
 * Sends welcome email to a new subscriber
 */
async function sendWelcomeEmail(email: string): Promise<void> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Cannot send welcome email: RESEND_API_KEY not configured');
      return;
    }

    const emailHtml = generateWelcomeEmail();
    
    // DEVELOPMENT MODE: Using onboarding@resend.dev can only send to delivered@resend.dev
    const isDevelopment = process.env.NODE_ENV !== 'production';
    const recipient = isDevelopment ? 'delivered@resend.dev' : email;
    
    if (isDevelopment) {
      console.warn(`⚠️  DEVELOPMENT MODE: Welcome email redirected to test recipient instead of ${email}`);
    }

    const result = await resend.emails.send({
      from: 'TechFrag Newsletter <onboarding@resend.dev>',
      to: recipient,
      subject: '🎉 Welcome to TechFrag Newsletter!',
      html: emailHtml,
    });

    console.log(`✓ Welcome email sent to ${isDevelopment ? 'test recipient' : email}. Result:`, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`✗ Error sending welcome email to ${email}:`, error);
    // Don't throw error - we don't want to fail subscription if email fails
  }
}

/**
 * Adds a new subscriber to the database
 */
export async function addSubscriber(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Check if email already exists
    const existing = await prisma.subscriber.findUnique({
      where: { email }
    });

    if (existing) {
      if (existing.isActive) {
        return { success: false, message: 'Email already subscribed' };
      } else {
        // Reactivate inactive subscription
        await prisma.subscriber.update({
          where: { email },
          data: { isActive: true }
        });
        
        // Send welcome back email
        await sendWelcomeEmail(email);
        
        return { success: true, message: 'Subscription reactivated successfully!' };
      }
    }

    // Create new subscriber
    await prisma.subscriber.create({
      data: { email }
    });

    // Send welcome email
    await sendWelcomeEmail(email);

    return { success: true, message: 'Successfully subscribed to newsletter!' };
  } catch (error) {
    console.error('Error adding subscriber:', error);
    return { success: false, message: 'Failed to subscribe. Please try again.' };
  }
}
