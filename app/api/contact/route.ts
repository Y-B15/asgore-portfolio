import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Process form data
    console.log('Received contact message:', body);

    return NextResponse.json(
      { success: true, message: 'Message received!' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 400 }
    );
  }
}