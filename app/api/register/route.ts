import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
  

    // Insert the new user
    const result = await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${password})
      RETURNING id, email
    `;

    return NextResponse.json({ user: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}