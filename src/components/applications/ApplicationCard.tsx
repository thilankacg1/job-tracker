import Link from 'next/link'
import { Application } from '@/types'
import StatusBadge from './StatusBadge'

interface Props {
  application: Application
}

export default function ApplicationCard({ application }: Props) {
  const appliedDate = new Date(application.appliedAt).toLocaleDateString(
    'en-AU',
    { day: 'numeric', month: 'short', year: 'numeric' }
  )

  return (
    <Link href={`/dashboard/applications/${application.id}`}>
      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition cursor-pointer">
        {/* Company and status */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{application.company}</h3>
            <p className="text-sm text-gray-500">{application.role}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>

        {/* Details row */}
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
          {application.location && (
            <span>📍 {application.location}</span>
          )}
          {application.salary && (
            <span>💰 {application.salary}</span>
          )}
          <span className="ml-auto">Applied {appliedDate}</span>
        </div>
      </div>
    </Link>
  )
}