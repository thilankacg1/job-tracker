export type ApplicationStatus =
  | 'APPLIED'
  | 'PHONE_SCREEN'
  | 'INTERVIEW'
  | 'TECHNICAL_TEST'
  | 'FINAL_ROUND'
  | 'OFFER'
  | 'REJECTED'
  | 'WITHDRAWN'

export interface Application {
  id: string
  userId: string
  company: string
  role: string
  jobUrl?: string | null
  location?: string | null
  salary?: string | null
  notes?: string | null
  status: ApplicationStatus
  appliedAt: string
  followUpAt?: string | null
  createdAt: string
  updatedAt: string
}

export const STATUS_CONFIG = {
  APPLIED: {
    label: 'Applied',
    color: 'bg-blue-500/15 text-blue-400',
  },
  PHONE_SCREEN: {
    label: 'Phone Screen',
    color: 'bg-purple-500/15 text-purple-400',
  },
  INTERVIEW: {
    label: 'Interview',
    color: 'bg-yellow-500/15 text-yellow-400',
  },
  TECHNICAL_TEST: {
    label: 'Technical Test',
    color: 'bg-orange-500/15 text-orange-400',
  },
  FINAL_ROUND: {
    label: 'Final Round',
    color: 'bg-indigo-500/15 text-indigo-400',
  },
  OFFER: {
    label: 'Offer',
    color: 'bg-green-500/15 text-green-400',
  },
  REJECTED: {
    label: 'Rejected',
    color: 'bg-red-500/15 text-red-400',
  },
  WITHDRAWN: {
    label: 'Withdrawn',
    color: 'bg-slate-500/15 text-slate-400',
  },
} as const