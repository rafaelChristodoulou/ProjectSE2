import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  if (!from || !to) {
    return NextResponse.json(
      { error: 'Invalid input' },
      { status: 400 }
    )
  }

  try {
    const { rows } = await sql`
      SELECT * FROM flight
      WHERE "from_airport" = ${from} AND "to_airport" = ${to}
    `
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error querying flights:', error)
    return NextResponse.json(
      { error: 'Error querying flights' },
      { status: 500 }
    )
  }
}