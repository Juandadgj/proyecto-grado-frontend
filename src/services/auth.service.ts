"use client"
import { deleteSession, saveSession } from "@/lib/auth/session";
import { HttpService } from "@/services";
import { IModel } from "@/types";
import { IAuthResponse } from "@/types/models";
import { redirect } from "next/navigation";
import { prisma } from '@/lib/prisma';

export async function loginWithGoogle(): Promise<void> {
  // * Implement a login with Google service
}

export async function logout(): Promise<void> {
  deleteSession();
  redirect('/login');
}

export async function register(username: string, email: string, password: string): Promise<IAuthResponse> {
  const http = new HttpService();
  return await http.loginAndSetToken<IModel.IRegisterFormData>("/auth/signup", { username,email, password });
}

export async function getAccessToken(): Promise<string | undefined> {
  const http = new HttpService();
  return await http.getAccessToken();
}