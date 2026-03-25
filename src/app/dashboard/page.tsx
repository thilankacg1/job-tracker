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
import Header from '@/components/ui/Header'

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
    <div className="min-h-screen bg-[#fffff]">

      <Header />

      <main className="max-w-5xl mx-auto px-6 py-8">

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Total Applied',
              value: applications.length,
              icon: <Briefcase className="w-4 h-4" />,
              color: 'text-[#60A5FA]',
              bg: 'bg-[#60A5FA]/10',
            },
            {
              label: 'Interviews',
              value: applications.filter((a) =>
                ['INTERVIEW', 'TECHNICAL_TEST', 'FINAL_ROUND'].includes(a.status)
              ).length,
              icon: <TrendingUp className="w-4 h-4" />,
              color: 'text-[#A78BFA]',
              bg: 'bg-[#A78BFA]/10',
            },
            {
              label: 'Offers',
              value: applications.filter((a) => a.status === 'OFFER').length,
              icon: <Award className="w-4 h-4" />,
              color: 'text-[#34D399]',
              bg: 'bg-[#34D399]/10',
            },
            {
              label: 'Response Rate',
              value:
                applications.length === 0
                  ? '0%'
                  : `${Math.round(
                      (applications.filter(
                        (a) =>
                          a.status !== 'APPLIED' && a.status !== 'WITHDRAWN'
                      ).length /
                        applications.length) *
                        100
                    )}%`,
              icon: <BarChart2 className="w-4 h-4" />,
              color: 'text-[#FBBF24]',
              bg: 'bg-[#FBBF24]/10',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#240f39] border border-[#2D2B3D] rounded-xl p-4"
            >
              <div className={`inline-flex p-2 rounded-lg ${stat.bg} ${stat.color} mb-3`}>
                {stat.icon}
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-100 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          {showForm ? (
            <div className="bg-[#1E1B2E] border border-[#2D2B3D] rounded-xl p-6">
              <h2 className="text-base font-semibold text-white mb-4">
                Add New Application
              </h2>
              <ApplicationForm
                onSuccess={handleSuccess}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-[#A78BFA] text-[#0F0E17] py-3 rounded-xl font-semibold hover:bg-[#9B7AEF] transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Application
            </button>
          )}
        </div>

        {applications.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by company or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#2D2B3D] rounded-lg text-sm text-black placeholder-slate-500 focus:outline-none focus:border-[#A78BFA] transition"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as ApplicationStatus | 'ALL')
                }
                className="pl-9 pr-8 py-2 bg-[#1E1B2E] border border-[#2D2B3D] rounded-lg text-sm text-white focus:outline-none focus:border-[#A78BFA] transition appearance-none cursor-pointer"
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
                onChange={(e) =>
                  setSortBy(e.target.value as 'newest' | 'oldest' | 'company')
                }
                className="pl-4 pr-8 py-2 bg-[#1E1B2E] border border-[#2D2B3D] rounded-lg text-sm text-white focus:outline-none focus:border-[#A78BFA] transition appearance-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="company">Company A–Z</option>
              </select>
            </div>
          </div>
        )}

        {applications.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                view === 'list'
                  ? 'bg-[#A78BFA] text-[#0F0E17]'
                  : 'bg-[#1E1B2E] border border-[#2D2B3D] text-slate-400 hover:text-white hover:border-[#A78BFA]/50'
              }`}
            >
              <LayoutList className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setView('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                view === 'kanban'
                  ? 'bg-[#A78BFA] text-[#0F0E17]'
                  : 'bg-[#1E1B2E] border border-[#2D2B3D] text-slate-400 hover:text-white hover:border-[#A78BFA]/50'
              }`}
            >
              <Columns className="w-4 h-4" />
              Kanban
            </button>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#1E1B2E] border border-[#2D2B3D] rounded-xl p-5 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-[#2D2B3D] rounded w-32"></div>
                    <div className="h-3 bg-[#2D2B3D] rounded w-48"></div>
                  </div>
                  <div className="h-5 bg-[#2D2B3D] rounded-full w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#1E1B2E] border border-[#2D2B3D] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No applications yet
            </h3>
            <p className="text-slate-500 text-sm">
              Click the button above to add your first job application
            </p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#1E1B2E] border border-[#2D2B3D] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No results found
            </h3>
            <p className="text-slate-500 text-sm">
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