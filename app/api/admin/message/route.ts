import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    success: true,
    messages: [
      {
        id: '1',
        name: 'Demo Inquiry',
        email: 'hello@example.com',
        message: 'This is a test contact message in your dashboard.',
        receivedAt: new Date().toISOString(),
      },
    ],
  })
}