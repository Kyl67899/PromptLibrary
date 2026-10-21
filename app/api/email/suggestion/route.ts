import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Reuse same rate-limiter configuration as contact route
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 10
const rateLimitMap = new Map<string, { count: number; windowStart: number }>()

function getIP(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for') || ''
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

export async function POST(req: Request) {
  try {
    const { featureSuggestion } = await req.json()

    if (!featureSuggestion || featureSuggestion.trim().length < 5) {
      return NextResponse.json({ error: 'Suggestion too short' }, { status: 400 })
    }

    // Rate limiting by IP for feedback submissions
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

    // Send suggestion email via Resend
    if (!resend) return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 })
    await resend.emails.send({
      from: 'PromptLibrary <support@promptlibrary.dev>', // replace with your domain
      to: 'shuttle876@gmail.com', // your receiving email
      subject: 'New Feature Prompt Suggestion',
      html: `
        <h2>New Feature Prompt Suggestion</h2>
        <p>${featureSuggestion}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to send feedback' },
      { status: 500 }
    )
  }
}
