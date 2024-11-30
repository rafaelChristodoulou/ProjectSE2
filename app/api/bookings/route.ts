import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: Request) {
    try {
      const { userId,fromAirport, toAirport, departureTime, price } = await request.json()
  
      // Validate the input
      if (!userId ||!fromAirport || !toAirport || !departureTime || !price) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
      }
  
      // Insert the booking into the database
      const result = await sql`
        INSERT INTO bookings (user_id, from_airport, to_airport, departure_time, price)
        VALUES (${userId}, ${fromAirport}, ${toAirport}, ${departureTime}, ${price})
        RETURNING id,created_at;
      `
  
      const bookingId = result.rows[0].id
  
      return NextResponse.json({ message: 'Booking created successfully', bookingId }, { status: 201 })
    } catch (error) {
      console.error('Error creating booking:', error)
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }
  }
  

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const result = await sql`
      SELECT * FROM bookings WHERE user_id = ${userId}
    `
    return NextResponse.json({ bookings: result.rows })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

