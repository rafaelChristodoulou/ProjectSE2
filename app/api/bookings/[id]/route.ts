import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    await sql`DELETE FROM bookings WHERE id = ${id}`
    return NextResponse.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Error deleting booking:', error)
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 })
  }
}
