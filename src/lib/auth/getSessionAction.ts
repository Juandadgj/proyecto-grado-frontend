'use server';
import { getSession } from './session';

export async function getSessionFromServer() {
  return getSession(); // Esto devuelve el objeto con rol, nombre, email
}
