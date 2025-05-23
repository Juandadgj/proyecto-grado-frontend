import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

async function getUserIdFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return null;
  }
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    // Obtener todos los ratings del usuario y sumar los puntos
    const ratings = await prisma.rating.findMany({
      where: {
        userId: userId
      },
      select: {
        score: true
      }
    });

    // Calcular la suma total de puntos
    const totalPoints = ratings.reduce((sum: number, rating: { score: number }) => sum + rating.score, 0);

    return NextResponse.json({ totalPoints });
  } catch (error) {
    console.error('Error al obtener el total de puntos:', error);
    return NextResponse.json(
      { error: 'Error al obtener el total de puntos' },
      { status: 500 }
    );
  }
} 