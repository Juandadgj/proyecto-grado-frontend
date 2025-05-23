'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // Usa variable real en producción

export interface SessionData {
  id: string;
  role: 'STUDENT' | 'TEACHER';
  name: string;
  email: string;
  ranking?: {
    position: number;
    totalScore: number;
  };
}

// Función para obtener el ranking del usuario
async function getUserRanking(userId: string) {
  try {
    // Obtener todas las puntuaciones del usuario
    const userRatings = await prisma.rating.findMany({
      where: { userId },
      select: { score: true }
    });

    // Calcular puntuación total del usuario
    const userTotalScore = userRatings.reduce((sum, rating) => sum + rating.score, 0);

    // Obtener todas las puntuaciones de todos los usuarios
    const allRatings = await prisma.rating.groupBy({
      by: ['userId'],
      _sum: {
        score: true
      }
    });
    console.log("allRatings", allRatings, userTotalScore);

    // Calcular la posición del usuario
    const sortedScores = allRatings
      .map(rating => rating._sum.score || 0)
      .sort((a, b) => b - a);

    const userPosition = sortedScores.findIndex(score => score === userTotalScore) + 1;

    return {
      position: userPosition,
      totalScore: userTotalScore
    };
  } catch (error) {
    console.error('Error al obtener el ranking del usuario:', error);
    return null;
  }
}

// Guardar JWT en cookie del servidor
export async function saveSession(user: SessionData) {
  try {
    // Obtener el ranking del usuario
    const ranking = await getUserRanking(user.id);

    // Incluir el ranking en los datos de la sesión
    const sessionData = {
      ...user,
      ranking: ranking || undefined
    };

    const token = jwt.sign(sessionData, JWT_SECRET, { expiresIn: '7d' });

    cookies().set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return sessionData;
  } catch (error) {
    console.error('Error al guardar la sesión:', error);
    throw error;
  }
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
