"use client"
import { HttpService } from "@/services";
import { IModel } from "@/types";
import { IAuthResponse } from "@/types/models";

export async function saveGame(game: IModel.IRating): Promise<IModel.IUser> {
  const http = new HttpService();
  return await http.post<IModel.IUser, IModel.IRating>("/users/rating", game);
}