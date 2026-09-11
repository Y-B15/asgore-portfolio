/**
 * Minimal admin authentication — a single password gate.
 *
 * The admin password is read from the `ADMIN_PASSWORD` environment variable.
 * For local/preview use it falls back to a default so the flow is testable.
 * On success we set an httpOnly cookie whose value is a SHA-256 token derived
 * from the password, so the raw password is never stored in the browser and
 * the cookie can be validated server-side without a database.
 */
import { cookies } from 'next/headers'
import crypto from 'crypto'

export const ADMIN_COOKIE = 'admin_session'

/** The configured admin password (with a dev fallback). */
function adminPassword(): string {
  return process.env.ADMIN_PASSWORD ?? 'admin123'
}

/** Deterministic session token derived from the current admin password. */
export function sessionToken(): string {
  return crypto
    .createHash('sha256')
    .update(`${adminPassword()}::portfolio-admin-v1`)
    .digest('hex')
}

/** Constant-time check that a submitted password is correct. */
export function verifyPassword(submitted: string): boolean {
  const a = Buffer.from(submitted)
  const b = Buffer.from(adminPassword())
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

/** True when the current request carries a valid admin session cookie. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return store.get(ADMIN_COOKIE)?.value === sessionToken()
}
