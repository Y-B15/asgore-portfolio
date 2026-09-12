import { NextResponse } from 'next/server'
import { messagesStore } from '@/lib/db'

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

    // Add new message to the top of the array
    messagesStore.unshift(newMessage)

    return NextResponse.json({ success: true, message: 'Message sent!' }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Failed to process request.' }, { status: 400 })
  }
}