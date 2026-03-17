'use client'

import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-md text-center w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2">Job Tracker</h1>
        <p className="text-gray-500 mb-8">Track every application in one place</p>
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}