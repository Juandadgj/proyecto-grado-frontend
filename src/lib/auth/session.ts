'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // Usa variable real en producción

export interface SessionData {
  id: string;
  role: 'STUDENT' | 'TEACHER';
  name: string;
  email: string;
}

// Guardar JWT en cookie del servidor
export async function saveSession(user: SessionData) {
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
}

// Leer el JWT desde cookie
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const session = jwt.verify(token, JWT_SECRET) as SessionData;
    return session;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  cookies().delete('session');
}
