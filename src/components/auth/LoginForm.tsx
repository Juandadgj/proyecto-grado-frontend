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
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white py-2 rounded"
    >
      {pending ? "Entrando..." : "Entrar"}
    </button>
  );
};

export default function LoginForm() {
  const router = useRouter();
  const [state, action] = useFormState(signIn, undefined);

  useEffect(() => {
    if (state?.status === "success") {
      if (state.role === "TEACHER") {
        router.push("/dashboard/");
      } else {
        router.push("/dashboard/");
      }
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
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
      <div>
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
      </div>
      {state?.status === "error" && (
        <p className="text-red-500">{state.message}</p>
      )}
      <div>
        <SubmmitButton />
      </div>
    </form>
  );
}
