'use client'
import { register } from '@/services'
import { signUp } from '@/lib/auth/actions'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
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

function SignUpForm() {
  const router = useRouter()
  const [state, action] = useFormState(signUp, undefined);

  useEffect(() => {
      if (state?.status === "success") {
        router.push("/dashboard/");
      }
    }, [state]);

  const onSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const response = await register(username, email, password)
    if (response.accessToken) {
      router.push('/dashboard')
    }
  }
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-[#00cef8]  focus:outline-none transition-colors duration-300 bg-transparent text-black" required/>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-[#00cef8]  focus:outline-none transition-colors duration-300 bg-transparent text-black" required />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-[#00cef8]  focus:outline-none transition-colors duration-300 bg-transparent text-black" required />
      </div>
      {state?.status === "error" && (
        <p className="text-red-500">{state.message}</p>
      )}
      <div>
        <SubmmitButton />
      </div>
    </form>
  )
}

export default SignUpForm
