import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Email validation schema
const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const real = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (real) {
    return real.trim()
  }
  
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate email
    const { email } = emailSchema.parse(body)
    
    // Get client information
    const ipAddress = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || undefined
    
    // Check if email already exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { email }
    })
    
    if (existingSubscription) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      )
    }
    
    // Send confirmation email first
    const { data, error: resendError } = await resend.emails.send({
      from: 'Vizag Writers <notify@vizagwriters.in>', // Replace with your verified domain
      to: [email],
      subject: 'Welcome to Vizag Writers - You\'re on the list! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Vizag Writers</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold; margin-bottom: 10px;">
                Welcome to Vizag Writers!
              </h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 0; font-size: 16px;">
                Your journey with us begins soon...
              </p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 64px; height: 64px; background-color: #10b981; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 style="color: #1f2937; margin: 0; font-size: 24px; font-weight: 600;">
                  You're All Set!
                </h2>
              </div>
              
              <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
                Thank you for joining our community of passionate writers, poets, and storytellers! We're thrilled to have you on board.
              </p>
              
              <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">
                  🚀 What's Coming Next?
                </h3>
                <ul style="color: #6b7280; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>A vibrant platform for writers and readers</li>
                  <li>Writing workshops and community events</li>
                  <li>Opportunities to showcase your work</li>
                  <li>Connect with fellow Vizag writers</li>
                </ul>
              </div>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0; border-radius: 4px;">
                <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 500;">
                  📅 <strong>Mark Your Calendar:</strong> We're launching on August 20, 2025 at 11:00 AM IST
                </p>
              </div>
              
              <p style="color: #6b7280; line-height: 1.6; margin-bottom: 30px; font-size: 16px;">
                We'll send you an exclusive early access invitation as soon as we're ready to launch. Get ready to be part of something extraordinary!
              </p>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://vizagwriters.in'}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Visit Our Website
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                Follow us for updates:
              </p>
              <div style="margin: 15px 0;">
                <a href="https://facebook.com/vizagwriters" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 14px;">Facebook</a>
                <a href="https://twitter.com/vizagwriters" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 14px;">Twitter</a>
                <a href="https://instagram.com/vizagwriters" style="color: #667eea; text-decoration: none; margin: 0 10px; font-size: 14px;">Instagram</a>
              </div>
              <p style="color: #9ca3af; margin: 10px 0 0 0; font-size: 12px;">
                Vizag Writers - Visakhapatnam, Andhra Pradesh, India
              </p>
              <p style="color: #9ca3af; margin: 5px 0 0 0; font-size: 12px;">
                If you didn't sign up for this, you can safely ignore this email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (resendError) {
      console.error('Resend error:', resendError)
      
      // Log failed email attempt
      await prisma.emailLog.create({
        data: {
          email,
          subject: 'Welcome to Vizag Writers - You\'re on the list! 🎉',
          status: 'failed',
          error: resendError.message,
        }
      })
      
      return NextResponse.json(
        { success: false, error: 'Failed to send confirmation email' },
        { status: 500 }
      )
    }

    // If email sent successfully, save to database
    const subscription = await prisma.subscription.create({
      data: {
        email,
        emailSentId: data?.id,
        ipAddress,
        userAgent,
        source: 'coming-soon',
        isVerified: true, // Email was sent successfully
      }
    })

    // Log successful email
    await prisma.emailLog.create({
      data: {
        email,
        subject: 'Welcome to Vizag Writers - You\'re on the list! 🎉',
        status: 'sent',
        resendId: data?.id,
        subscriptionId: subscription.id,
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed! Check your email for confirmation.',
        emailId: data?.id,
        subscriptionId: subscription.id
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// GET endpoint to check if email exists and get subscription stats
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const stats = searchParams.get('stats')
  
  // Get subscription stats
  if (stats === 'true') {
    try {
      const totalSubscriptions = await prisma.subscription.count()
      const verifiedSubscriptions = await prisma.subscription.count({
        where: { isVerified: true }
      })
      const recentSubscriptions = await prisma.subscription.count({
        where: {
          subscribedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          }
        }
      })
      
      return NextResponse.json({
        total: totalSubscriptions,
        verified: verifiedSubscriptions,
        recent: recentSubscriptions
      })
    } catch (error) {
      console.error('Stats error:', error)
      return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 })
    }
  }
  
  // Check if specific email exists
  if (!email) {
    return NextResponse.json({ exists: false })
  }
  
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { email },
      select: { id: true, subscribedAt: true, isVerified: true }
    })
    
    return NextResponse.json({ 
      exists: !!subscription,
      subscription: subscription || null
    })
  } catch (error) {
    console.error('Email check error:', error)
    return NextResponse.json({ exists: false })
  }
}