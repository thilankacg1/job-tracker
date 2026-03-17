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
  APPLIED: { label: 'Applied', color: 'bg-blue-100 text-blue-700' },
  PHONE_SCREEN: { label: 'Phone Screen', color: 'bg-purple-100 text-purple-700' },
  INTERVIEW: { label: 'Interview', color: 'bg-yellow-100 text-yellow-700' },
  TECHNICAL_TEST: { label: 'Technical Test', color: 'bg-orange-100 text-orange-700' },
  FINAL_ROUND: { label: 'Final Round', color: 'bg-indigo-100 text-indigo-700' },
  OFFER: { label: 'Offer', color: 'bg-green-100 text-green-700' },
  REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-700' },
  WITHDRAWN: { label: 'Withdrawn', color: 'bg-gray-100 text-gray-700' },
} as const