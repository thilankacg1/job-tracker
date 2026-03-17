'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Application } from '@/types'

const schema = z.object({
  company: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role is required'),
  jobUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  location: z.string().optional(),
  salary: z.string().optional(),
  notes: z.string().optional(),
  followUpAt: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  application: Application
  onSuccess: (updated: Application) => void
  onCancel: () => void
}

export default function EditApplicationForm({
  application,
  onSuccess,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: application.company,
      role: application.role,
      jobUrl: application.jobUrl ?? '',
      location: application.location ?? '',
      salary: application.salary ?? '',
      notes: application.notes ?? '',
      followUpAt: application.followUpAt
        ? new Date(application.followUpAt).toISOString().split('T')[0]
        : '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`/api/applications/${application.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to update application')

      const updated = await res.json()
      onSuccess(updated)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company <span className="text-red-500">*</span>
        </label>
        <input
          {...register('company')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.company && (
          <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role <span className="text-red-500">*</span>
        </label>
        <input
          {...register('role')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
        )}
      </div>

      {/* Job URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job URL
        </label>
        <input
          {...register('jobUrl')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.jobUrl && (
          <p className="text-red-500 text-xs mt-1">{errors.jobUrl.message}</p>
        )}
      </div>

      {/* Location and Salary */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            {...register('location')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salary
          </label>
          <input
            {...register('salary')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>

      {/* Follow-up Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Follow-up Date
        </label>
        <input
          type="date"
          {...register('followUpAt')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}