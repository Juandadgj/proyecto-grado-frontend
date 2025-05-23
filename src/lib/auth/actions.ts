'use server';

import { prisma } from '@/lib/prisma';
import { saveSession } from './session';

export type SignInResponse =
  | { status: 'success'; role: 'STUDENT' | 'TEACHER' }
  | { status: 'error'; message: string };

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

export async function signIn(prevState: any, formData: FormData): Promise<SignInResponse> {
  const identifier = formData.get('emailOrStudentCode') as string;
  const password = formData.get('password') as string;

  if (!identifier || !password) {
    return { status: 'error', message: 'Campos requeridos.' };
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    return { status: 'error', message: 'Usuario no encontrado.' };
  }

  if (!user.password) {
    return { status: 'error', message: 'Contraseña no establecida para este usuario.' };
  }

  if (user.password !== password) {
    return { status: 'error', message: 'Contraseña incorrecta.' };
  }

  if (user.role === 'STUDENT' || user.role === 'TEACHER') {
    // Obtener el ranking del usuario
    const ranking = await getUserRanking(user.id);

    // Guardar la sesión con el ranking incluido
    await saveSession({
      id: user.id,
      role: user.role,
      name: user.name || '',
      email: user.email || '',
      ranking: ranking || undefined
    });

    return {
      status: 'success',
      role: user.role,
    };
  } else {
    return { status: 'error', message: 'Rol de usuario no válido.' };
  }
}

export async function signUp(prevState: any, formData: FormData): Promise<SignInResponse> {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!username || !email || !password) {
    return { status: 'error', message: 'Campos requeridos.' };
  }

  const existUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existUser) {
    return { status: 'error', message: 'Usuario ya existente.' };
  }

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: password,
      role: 'STUDENT',
    },
  });

  await saveSession({
      id: user.id,
      role: user.role,
      name: user.name || '',
      email: user.email || '',
      ranking: undefined
    });

  return { status: 'success', role: 'STUDENT' };
}
