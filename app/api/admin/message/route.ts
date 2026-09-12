import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { messagesStore } from '@/lib/db'

export async function GET() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ success: true, messages: messagesStore })
}