"use server";

import { instance } from "@/services/http.service";

import { redirect } from "next/navigation";

export async function getRatings(email: string) {
  try {
    const response = await instance.get(`/users/${email}`);
    return response.data
  } catch (error: any) {
    console.log(error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
    }
    return {
      message: "Algo salio mal",
    };
  }
}
