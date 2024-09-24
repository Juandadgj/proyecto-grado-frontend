"use server";

import { instance } from "@/services/http.service";
import { FormState } from "@/types/form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(state: FormState, formData: FormData) {
  try {
    const validatedFields = {
      emailOrStudentCode: formData.get("emailOrStudentCode") as string,
      password: formData.get("password") as string,
    };
    const response = await instance.post("/auth/signin", validatedFields);
    console.log(response.data);
    cookies().set("AccessToken", response.data.accessToken);
    return {
      status: 'success'
    }
  } catch (error: any) {
    console.log(error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response.status === 401) {
        return {
          message: "Usuario o contraseña incorrecto",
        };
      }
    }
    return {
      message: "Algo salio mal",
    };
  }
}
