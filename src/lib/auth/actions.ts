'use server';

import { prisma } from '@/lib/prisma';
import { saveSession } from './session';

export type SignInResponse =
  | { status: 'success'; role: 'STUDENT' | 'TEACHER' }
  | { status: 'error'; message: string };

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
    // Guardar la sesión
    saveSession({
    id: user.id,
    role: user.role,
    name: user.name || '',
    email: user.email || '',
  });

    return {
      status: 'success',
      role: user.role,
    };
  } else {
    return { status: 'error', message: 'Rol de usuario no válido.' };
  }
}
