"use client"
import { HttpService } from "@/services";
import { IModel } from "@/types";
import { IAuthResponse } from "@/types/models";

export async function login(emailOrStudentCode: string, password: string) {
  const http = new HttpService();
  return await http.loginAndSetToken<IModel.ILoginFormData>("/auth/signin", { emailOrStudentCode, password });
}

export async function loginWithGoogle(): Promise<void> {
  // * Implement a login with Google service
}

export async function logout(): Promise<void> {
  const http = new HttpService();
  return await http.logout();
}

export async function register(username: string, email: string, password: string): Promise<IAuthResponse> {
  const http = new HttpService();
  return await http.loginAndSetToken<IModel.IRegisterFormData>("/auth/signup", { username,email, password });
}

export async function getAccessToken(): Promise<string | undefined> {
  const http = new HttpService();
  return await http.getAccessToken();
}