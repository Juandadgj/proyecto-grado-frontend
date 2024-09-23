import LoginForm from '@/components/auth/LoginForm'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="max-w-md w-full p-6">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Inicia sesión</h1>
      <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Únete a nuestra plataforma y disfruta de un aprendizaje accesible y divertido</h1>
      <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
      </div>
      <LoginForm />
    </div>

  )
}

export default LoginPage