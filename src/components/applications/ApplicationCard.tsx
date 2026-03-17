import Link from 'next/link'
import { MapPin, DollarSign, Calendar, ChevronRight } from 'lucide-react'
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
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{application.company}</h3>
            <p className="text-sm text-gray-500">{application.role}</p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={application.status} />
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-400">
          {application.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {application.location}
            </span>
          )}
          {application.salary && (
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {application.salary}
            </span>
          )}
          <span className="flex items-center gap-1 ml-auto">
            <Calendar className="w-3 h-3" />
            {appliedDate}
          </span>
        </div>
      </div>
    </Link>
  )
}