import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, sessionToken, verifyPassword } from '@/lib/auth'

export async function POST(request: Request) {
  let password = ''
  try {
    const body = await request.json()
    password = typeof body?.password === 'string' ? body.password : ''
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })

  response.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return response
}