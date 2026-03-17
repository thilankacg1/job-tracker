'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Application } from '@/types'
import ApplicationCard from '@/components/applications/ApplicationCard'
import ApplicationForm from '@/components/applications/ApplicationForm'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications')
      const data = await res.json()
      setApplications(data)
    } catch (error) {
      console.error('Failed to fetch applications', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleSuccess = () => {
    setShowForm(false)
    fetchApplications()
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Job Tracker</h1>
            <p className="text-sm text-gray-500">Welcome back, {session?.user?.name}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Applied', value: applications.length },
            { label: 'Interviews', value: applications.filter(a => ['INTERVIEW', 'TECHNICAL_TEST', 'FINAL_ROUND'].includes(a.status)).length },
            { label: 'Offers', value: applications.filter(a => a.status === 'OFFER').length },
            { label: 'Response Rate', value: applications.length === 0 ? '0%' : `${Math.round((applications.filter(a => a.status !== 'APPLIED' && a.status !== 'WITHDRAWN').length / applications.length) * 100)}%` },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Add application button and form */}
        <div className="mb-6">
          {showForm ? (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Add New Application</h2>
              <ApplicationForm
                onSuccess={handleSuccess}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              <span className="text-lg">+</span> Add Application
            </button>
          )}
        </div>

        {/* Applications list */}
        {loading ? (
          // Skeleton loading cards
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-48"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📋</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-500 text-sm">Click the button above to add your first job application</p>
          </div>
        ) : (
          // Applications list
          <div className="space-y-3">
            {applications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        )}

      </main>
    </div>
  )
}