import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'supersecret'; // Usa una variable segura en producción

const PUBLIC_ROUTES = ['/', '/login']; // Ajusta según tus rutas públicas

export function middleware(req: NextRequest) {
  console.log('✅ Middleware ejecutado para:', req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|login|registro|publico).*)'],
};
