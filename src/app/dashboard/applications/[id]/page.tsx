'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2, Pencil, X, Bell } from 'lucide-react'
import { Application, ApplicationStatus, STATUS_CONFIG } from '@/types'
import EditApplicationForm from '@/components/applications/EditApplicationForm'

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(`/api/applications/${id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setApplication(data)
      } catch (error) {
        console.error(error)
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [id, router])

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (!application) return
    setUpdatingStatus(true)
    try {
      const res = await fetch(`/api/applications/${application.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const updated = await res.json()
      setApplication(updated)
    } catch (error) {
      console.error(error)
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleDelete = async () => {
    if (!application) return
    const confirmed = confirm(
      `Are you sure you want to delete the application for ${application.company}?`
    )
    if (!confirmed) return

    setDeleting(true)
    try {
      await fetch(`/api/applications/${application.id}`, {
        method: 'DELETE',
      })
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!application) return null

  const appliedDate = new Date(application.appliedAt).toLocaleDateString(
    'en-AU',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  const isFollowUpDue =
    application.followUpAt &&
    new Date(application.followUpAt) <= new Date()

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">

        {/* Title block */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {application.company}
              </h1>
              <p className="text-gray-500 mt-1">{application.role}</p>
            </div>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {application.location && (
              <div>
                <p className="text-gray-400 text-xs mb-1">Location</p>
                <p className="text-gray-700">📍 {application.location}</p>
              </div>
            )}
            {application.salary && (
              <div>
                <p className="text-gray-400 text-xs mb-1">Salary</p>
                <p className="text-gray-700">💰 {application.salary}</p>
              </div>
            )}
            {application.jobUrl && (
              <div>
                <p className="text-gray-400 text-xs mb-1">Job URL</p>
                
                  <a href={application.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline truncate block"
                >
                  View job posting ↗
                </a>
              </div>
            )}
            <div>
              <p className="text-gray-400 text-xs mb-1">Applied</p>
              <p className="text-gray-700">📅 {appliedDate}</p>
            </div>
            {application.followUpAt && (
              <div>
                <p className="text-gray-400 text-xs mb-1">Follow-up Date</p>
                <p
                  className={`flex items-center gap-1 ${
                    isFollowUpDue
                      ? 'text-red-600 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  {new Date(application.followUpAt).toLocaleDateString(
                    'en-AU',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
                  {isFollowUpDue && (
                    <span className="text-red-500 text-xs ml-1">— Overdue</span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Notes */}
          {application.notes && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-gray-400 text-xs mb-1">Notes</p>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">
                {application.notes}
              </p>
            </div>
          )}
        </div>

        {/* Edit form or edit button */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          {editing ? (
            <>
              <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center justify-between">
                Edit Application
                <button
                  onClick={() => setEditing(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </h2>
              <EditApplicationForm
                application={application}
                onSuccess={(updated) => {
                  setApplication(updated)
                  setEditing(false)
                }}
                onCancel={() => setEditing(false)}
              />
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Application
            </button>
          )}
        </div>

        {/* Status updater */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Update Status
          </h2>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(STATUS_CONFIG) as ApplicationStatus[]).map(
              (status) => {
                const isActive = application.status === status
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    disabled={updatingStatus || isActive}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      isActive
                        ? STATUS_CONFIG[status].color +
                          ' ring-2 ring-offset-1 ring-gray-400'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    } disabled:opacity-50`}
                  >
                    {STATUS_CONFIG[status].label}
                  </button>
                )
              }
            )}
          </div>
        </div>

      </main>
    </div>
  )
}