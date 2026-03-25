'use client'

import { signOut, useSession } from 'next-auth/react'
import { Briefcase, LogOut } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import jobtrackerIcon from '../../assets/jobtracker-icon.png'
import Image from 'next/image'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header
      className="sticky top-0 z-10 border-b bg-linear-to-br from-[#667eea] to-[#764ba2]"
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
          >
            
            <Image
              src={jobtrackerIcon}
              alt="Job Tracker Logo" 
              width={100}
              height={100}
              className="rounded-full"
             />
          </div>
          <div>
            <h1
              className="text-sm font-bold leading-none text-white"
            >
              Job Tracker
            </h1>
            {session?.user?.name && (
              <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                Welcome! {session.user.name}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <ThemeToggle /> */}
          <button
            onClick={() => {
              const confirmed = confirm('Are you sure you want to sign out?')
              if (confirmed) signOut({ callbackUrl: '/login' })
            }}
            className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border transition border-gray-100 text-gray-200 hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  )
}