import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // Ensure params is a Promise
) {
  // Await the params before using them
  const params = await context.params;
  const { id } = params;

  console.log('Context params:', params);

  try {
    await sql`DELETE FROM bookings WHERE id = ${id}`;
    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}