export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  receivedAt: string
}

const globalForDb = globalThis as unknown as { messages: ContactMessage[] }

export const messagesStore: ContactMessage[] = globalForDb.messages || []

if (process.env.NODE_ENV !== 'production') {
  globalForDb.messages = messagesStore
}

export function deleteMessage(id: string): boolean {
  const index = messagesStore.findIndex((m) => m.id === id)
  if (index !== -1) {
    messagesStore.splice(index, 1)
    return true
  }
  return false
}