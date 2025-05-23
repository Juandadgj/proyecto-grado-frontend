import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

async function getUserIdFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    return { id: decoded.id, role: decoded.role };
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

    const userData = await getUserIdFromToken(token);
    if (!userData) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      );
    }

    // Verificar que el usuario sea profesor
    if (userData.role !== 'TEACHER') {
      return NextResponse.json(
        { error: 'No autorizado. Solo los profesores pueden ver el ranking global.' },
        { status: 403 }
      );
    }

    // Obtener todas las puntuaciones agrupadas por usuario
    const allRatings = await prisma.rating.groupBy({
      by: ['userId'],
      _sum: {
        score: true
      }
    });

    // Obtener la información de los usuarios
    const rankingWithUsers = await Promise.all(
      allRatings.map(async (rating) => {
        const user = await prisma.user.findUnique({
          where: { id: rating.userId },
          select: {
            id: true,
            username: true,
            name: true,
          },
        });

        return {
          userId: rating.userId,
          username: user?.username || 'Usuario desconocido',
          name: user?.name || 'Sin nombre',
          totalScore: rating._sum.score || 0,
          isTeacher: user?.id === userData.id // Marcar si es el profesor actual
        };
      })
    );

    // Ordenar por puntuación total y asignar posiciones
    const sortedRanking = rankingWithUsers
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((entry, index) => ({
        ...entry,
        position: index + 1,
      }));

    // Encontrar la posición del profesor
    const teacherEntry = sortedRanking.find(entry => entry.isTeacher);
    
    // Si el profesor no está en los primeros 10, agregarlo al final
    let finalRanking = sortedRanking.slice(0, 10);
    if (teacherEntry && !finalRanking.some(entry => entry.isTeacher)) {
      finalRanking = [...finalRanking.slice(0, 9), teacherEntry];
    }

    return NextResponse.json({ 
      ranking: finalRanking
    });
  } catch (error) {
    console.error('Error al obtener el ranking global:', error);
    return NextResponse.json(
      { error: 'Error al obtener el ranking global' },
      { status: 500 }
    );
  }
} 