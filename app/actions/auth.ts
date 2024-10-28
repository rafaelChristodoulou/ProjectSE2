'use server'

import { db } from '@/lib/db';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function login(email: string, password: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  const user = result.rows[0];

  if (!user) {
    return { success: false, message: 'User not found' };
  }
/*
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { success: false, message: 'Invalid password' };
  }

  return { success: true, user: { id: user.id, email: user.email } };
*/
if (user.password !== password) {
  return { success: false, message: 'Invalid password' };
}

return { success: true, user: { id: user.id, email: user.email } };

}