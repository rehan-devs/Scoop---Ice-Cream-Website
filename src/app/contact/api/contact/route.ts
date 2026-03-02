import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional().or(z.literal('')),
  inquiryType: z.enum([
    'General',
    'Catering',
    'Private Events',
    'Wholesale',
    'Feedback',
    'Other',
  ]),
  eventDate: z.string().optional().or(z.literal('')),
  guestCount: z.string().optional().or(z.literal('')),
  message: z.string().min(20, 'Message must be at least 20 characters').max(5000),
  honeypot: z.string().max(0, 'Bot detected'),
});

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return false;
  }

  if (entry.count >= 5) {
    return true;
  }

  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validated = contactSchema.parse(body);

    // If honeypot is filled, silently succeed (it's a bot)
    if (validated.honeypot) {
      return NextResponse.json({ success: true });
    }

    // If RESEND_API_KEY is set, send email via Resend
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'SCOÖP Contact <onboarding@resend.dev>',
        to: ['hello@scoop.shop'],
        reply_to: validated.email,
        subject: `New ${validated.inquiryType} Inquiry from ${validated.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validated.name}</p>
          <p><strong>Email:</strong> ${validated.email}</p>
          <p><strong>Phone:</strong> ${validated.phone || 'Not provided'}</p>
          <p><strong>Inquiry Type:</strong> ${validated.inquiryType}</p>
          ${validated.eventDate ? `<p><strong>Event Date:</strong> ${validated.eventDate}</p>` : ''}
          ${validated.guestCount ? `<p><strong>Guest Count:</strong> ${validated.guestCount}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${validated.message.replace(/\n/g, '<br>')}</p>
        `,
      });
    } else {
      // Log to console in development
      console.log('Contact form submission:', validated);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}