import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { messagesStore } from '@/lib/db'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    }

    messagesStore.unshift(newMessage)

    // Trigger email notification via Resend
    if (resend && process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'Portfolio <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: `New Portfolio Message from ${name}`,
        html: `
          <h3>New Message Received</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f4f4f4; padding: 12px; border-left: 4px solid #0070f3;">
            ${message}
          </blockquote>
        `,
      })
    }

    return NextResponse.json({ success: true, message: 'Message sent!' }, { status: 200 })
  } catch (error) {
    console.error('Contact submit error:', error)
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 500 })
  }
}