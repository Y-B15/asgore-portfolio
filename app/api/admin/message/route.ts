import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export async function GET() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Replace with database query when connected
  const messages = [
    {
      id: 'm1',
      name: 'Léa Moreau',
      email: 'lea.moreau@example.com',
      message: 'Hi! I run a small game project and would love help structuring our Discord server.',
      receivedAt: '2026-09-08T14:22:00.000Z',
    },
  ]

  return NextResponse.json({ success: true, messages })
}