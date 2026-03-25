import Link from 'next/link'
import { MapPin, DollarSign, Calendar, ChevronRight, Bell } from 'lucide-react'
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

    const now = new Date()
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)

    const isFollowUpDue =
        application.followUpAt &&
        new Date(application.followUpAt) <= now

    const isFollowUpSoon =
        application.followUpAt &&
        new Date(application.followUpAt) > now &&
        new Date(application.followUpAt) <= twoDaysFromNow

    return (
        <Link href={`/dashboard/applications/${application.id}`}>
            <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition cursor-pointer mb-2">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                        <h3 className="font-semibold text-gray-900">{application.company}</h3>
                        <p className="text-sm text-gray-500">{application.role}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                        <div className="flex items-center gap-2">
                            <StatusBadge status={application.status} />
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                        </div>
                        {isFollowUpDue && (
                            <span className="flex items-center gap-1 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                <Bell className="w-3 h-3" />
                                Follow up overdue
                            </span>
                        )}
                        {isFollowUpSoon && (
                            <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full font-medium">
                                <Bell className="w-3 h-3" />
                                Follow up soon
                            </span>
                        )}
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