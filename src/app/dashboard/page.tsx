'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import {
  Plus,
  LogOut,
  Briefcase,
  TrendingUp,
  Award,
  BarChart2,
  LayoutList,
  Columns,
  Search,
  Filter,
} from 'lucide-react'
import { Application, ApplicationStatus, STATUS_CONFIG } from '@/types'
import ApplicationCard from '@/components/applications/ApplicationCard'
import ApplicationForm from '@/components/applications/ApplicationForm'
import KanbanBoard from '@/components/applications/KanbanBoard'

export default function DashboardPage() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [view, setView] = useState<'list' | 'kanban'>('list')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'ALL'>('ALL')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'company'>('newest')

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

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    try {
      await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      )
    } catch (error) {
      console.error(error)
    }
  }

  const filteredApplications = applications
    .filter((a) => (filterStatus === 'ALL' ? true : a.status === filterStatus))
    .filter((a) =>
      search.trim() === ''
        ? true
        : a.company.toLowerCase().includes(search.toLowerCase()) ||
        a.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest')
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === 'oldest')
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortBy === 'company')
        return a.company.localeCompare(b.company)
      return 0
    })

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Job Tracker</h1>
            <p className="text-sm text-gray-500">
              Welcome back, {session?.user?.name}
            </p>
          </div>
          <button
            onClick={() => {
              const confirmed = confirm('Are you sure you want to sign out?')
              if (confirmed) signOut({ callbackUrl: '/login' })
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Total Applied',
              value: applications.length,
              icon: <Briefcase className="w-4 h-4" />,
            },
            {
              label: 'Interviews',
              value: applications.filter((a) =>
                ['INTERVIEW', 'TECHNICAL_TEST', 'FINAL_ROUND'].includes(a.status)
              ).length,
              icon: <TrendingUp className="w-4 h-4" />,
            },
            {
              label: 'Offers',
              value: applications.filter((a) => a.status === 'OFFER').length,
              icon: <Award className="w-4 h-4" />,
            },
            {
              label: 'Response Rate',
              value:
                applications.length === 0
                  ? '0%'
                  : `${Math.round(
                    (applications.filter(
                      (a) => a.status !== 'APPLIED' && a.status !== 'WITHDRAWN'
                    ).length /
                      applications.length) *
                    100
                  )}%`,
              icon: <BarChart2 className="w-4 h-4" />,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-xl p-4 text-center"
            >
              <div className="flex justify-center mb-2 text-gray-400">
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Add application button or form */}
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
              <Plus className="w-4 h-4" />
              Add Application
            </button>
          )}
        </div>

        {/* Search and filter */}
        {applications.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as ApplicationStatus | 'ALL')
                }
                className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white appearance-none cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                {(Object.keys(STATUS_CONFIG) as ApplicationStatus[]).map(
                  (status) => (
                    <option key={status} value={status}>
                      {STATUS_CONFIG[status].label}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'company')}
                className="pl-4 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black bg-white appearance-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="company">Company A–Z</option>
              </select>
            </div>
          </div>
        )}

        {/* View toggle */}
        {applications.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${view === 'list'
                ? 'bg-black text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
            >
              <LayoutList className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setView('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${view === 'kanban'
                ? 'bg-black text-white'
                : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
            >
              <Columns className="w-4 h-4" />
              Kanban
            </button>
          </div>
        )}

        {/* Applications */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse"
              >
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
          <div className="text-center py-16">
            <p className="text-4xl mb-4">📋</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No applications yet
            </h3>
            <p className="text-gray-500 text-sm">
              Click the button above to add your first job application
            </p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-500 text-sm">
              Try a different search term or filter
            </p>
          </div>
        ) : view === 'list' ? (
          <div className="space-y-3">
            {filteredApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        ) : (
          <KanbanBoard
            applications={filteredApplications}
            onStatusChange={handleStatusChange}
          />
        )}

      </main>
    </div>
  )
}