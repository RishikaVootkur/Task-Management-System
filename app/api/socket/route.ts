import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Socket.io server is running' });
}

export async function POST() {
  return NextResponse.json({ message: 'Socket.io server is running' });
}

export async function PUT() {
  return NextResponse.json({ message: 'Socket.io server is running' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Socket.io server is running' });
}