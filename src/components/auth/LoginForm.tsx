"use client";
import { signIn } from "@/lib/auth/actions";
import { login, loginWithGoogle } from "@/services";
import { FormState } from "@/types/form";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

const SubmmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="w-full flex items-center justify-center bg-black text-white mt-4 p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
      disabled={pending}
      type="submit"
    >
      {pending && <span className="loading loading-spinner loading-md"></span>}
      Entrar
    </button>
  );
};

function LoginForm() {
  const router = useRouter();
  const onSubmit = async (formData: FormData) => {
    try {
      const emailOrStudentCode = formData.get("emailOrStudentCode") as string;
      const password = formData.get("password") as string;
      const response = await login(emailOrStudentCode, password);
      if (response.accessToken) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onGoogleLogin = () => {
    loginWithGoogle();
  };

  const [state, action] = useFormState<FormState, any>(signIn, undefined);
  
  useEffect(() => {
    if (state?.status === "success") {
      router.push("/dashboard");
    }
  }, [state]);

  return (
    <form action={action} method="POST" className="space-y-4">
      <div>
        <label
          htmlFor="emailOrStudentCode"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre de usuario
        </label>
        <input
          type="text"
          id="emailOrStudentCode"
          name="emailOrStudentCode"
          className="mt-1 p-2 w-full border rounded-md focus:border-[#00cef8]  focus:outline-none transition-colors duration-300 bg-transparent text-black"
          required
        />
      </div>
      {/* <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 p-2 w-full border rounded-md focus:border-[#00cef8]  focus:outline-none transition-colors duration-300 bg-transparent text-black"
          required
        />
      </div> */}
      {state?.message && <p className="text-red-500">{state.message}</p>}
      <div>
        <SubmmitButton />
      </div>
    </form>
  );
}

export default LoginForm;
