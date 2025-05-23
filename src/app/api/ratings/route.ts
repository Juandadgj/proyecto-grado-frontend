import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

const getUserIdFromToken = (token: string | undefined) => {
  try {
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    return decoded.id;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return null;
  }
};

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('session')?.value;
    const userId = getUserIdFromToken(token);

    if (!userId) {
      console.log("No se encontró token o token inválido");
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { game, score } = await request.json();

    if (!game || typeof score !== 'number') {
      return NextResponse.json(
        { error: 'Datos inválidos. Se requiere game y score' },
        { status: 400 }
      );
    }

    const rating = await prisma.rating.create({
      data: {
        game,
        score,
        userId,
      },
    });

    return NextResponse.json(rating);
  } catch (error) {
    console.error('Error al guardar rating:', error);
    return NextResponse.json(
      { error: 'Error al guardar la calificación' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('session')?.value;
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const ratings = await prisma.rating.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return NextResponse.json(ratings);
  } catch (error) {
    console.error('Error al obtener ratings:', error);
    return NextResponse.json(
      { error: 'Error al obtener las calificaciones' },
      { status: 500 }
    );
  }
} 