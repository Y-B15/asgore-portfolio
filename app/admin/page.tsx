'use client'

import { useState, useEffect } from 'react'
import { ShieldAlert, Mail, LogOut, RefreshCw } from 'lucide-react'

interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  receivedAt: string
}

export default function AdminPage() {
  const [isAuth, setIsAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/messages')
      if (res.ok) {
        const data = await res.json()
        setMessages(data.messages || [])
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    } catch {
      setIsAuth(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      setPassword('')
      fetchMessages()
    } else {
      const data = await res.json()
      setError(data.error || 'Invalid password')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setIsAuth(false)
    setMessages([])
  }

  if (!isAuth) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-2 text-primary">
            <ShieldAlert className="size-6" />
            <h1 className="font-mono text-xl font-bold">Admin Portal</h1>
          </div>
          {error && <p className="mb-3 text-xs text-destructive">{error}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="mb-4 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2 font-mono text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Authenticate
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Portfolio Contact Submissions</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchMessages}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 font-mono text-xs hover:bg-accent/10"
          >
            <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md bg-destructive px-3 py-2 font-mono text-xs text-destructive-foreground hover:opacity-90"
          >
            <LogOut className="size-4" /> Logout
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="rounded-lg border border-border bg-card/40 p-8 text-center text-muted-foreground">
            No messages received yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="rounded-lg border border-border bg-card p-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-primary" />
                  <span className="font-semibold">{msg.name}</span>
                  <span className="text-xs text-muted-foreground">({msg.email})</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {new Date(msg.receivedAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}