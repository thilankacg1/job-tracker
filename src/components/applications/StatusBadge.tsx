import { ApplicationStatus, STATUS_CONFIG } from '@/types'

interface Props {
  status: ApplicationStatus
}

export default function StatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  )
}