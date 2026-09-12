export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  receivedAt: string
}

const globalForDb = globalThis as unknown as { messages: ContactMessage[] }

export const messagesStore: ContactMessage[] = globalForDb.messages || [
  {
    id: 'sample-1',
    name: 'Léa Moreau',
    email: 'lea.moreau@example.com',
    message: 'Hi! I need help structuring our Discord server.',
    receivedAt: new Date().toISOString(),
  },
]

if (process.env.NODE_ENV !== 'production') {
  globalForDb.messages = messagesStore
}