import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM airports`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching airports:', error);
    return NextResponse.json({ error: 'Failed to fetch airports' }, { status: 500 });
  }
}