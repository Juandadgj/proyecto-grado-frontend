import SignUpForm from '@/components/auth/SignUpForm'
import Link from 'next/link'
import React from 'react'

const SignUp = () => {
  return (
    <div className="max-w-md w-full p-6">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign Up</h1>
      <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join to Our Community with all time access and free </h1>
      <SignUpForm />
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Already have an account? <Link href="login/" className="text-black hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp