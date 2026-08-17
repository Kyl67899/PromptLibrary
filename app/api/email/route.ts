import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiter (per-IP).
// Note: In serverless deployments this is ephemeral. Consider Redis or a persistent store for production.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5
const rateLimitMap = new Map<string, { count: number; windowStart: number }>()

function getIP(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for') || ''
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

export async function POST(req: Request) {
  try {
    const { name, email, message, honeypot } = await req.json()

    // Spam filter: if honeypot is filled, reject
    if (honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
    }

    // Rate limiting by IP
    const ip = getIP(req)
    const now = Date.now()
    const entry = rateLimitMap.get(ip)

    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.set(ip, { count: 1, windowStart: now })
    } else {
      if (entry.count >= RATE_LIMIT_MAX) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
      }
      entry.count = entry.count + 1
      rateLimitMap.set(ip, entry)
    }

    await resend.emails.send({
      from: 'PromptLibrary <support@promptlibrary.dev>', // replace with your domain
      to: 'shuttle876@gmail.com', // your receiving email
      subject: `New contact form submission from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send message' }, { status: 500 })
  }
}
