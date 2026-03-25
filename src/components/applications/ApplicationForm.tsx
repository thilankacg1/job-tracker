'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
  onSuccess: () => void
  onCancel: () => void
}

export default function ApplicationForm({ onSuccess, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to create application')

      onSuccess()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">
          Company <span className="text-red-500">*</span>
        </label>
        <input
          {...register('company')}
          placeholder="e.g. Canva"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.company && (
          <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>
        )}
          </div>
          
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">
          Role <span className="text-red-500">*</span>
        </label>
        <input
          {...register('role')}
          placeholder="e.g. Senior Frontend Developer"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">
          Job URL
        </label>
        <input
          {...register('jobUrl')}
          placeholder="e.g. https://seek.com.au/job/123"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
        {errors.jobUrl && (
          <p className="text-red-500 text-xs mt-1">{errors.jobUrl.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">
            Location
          </label>
          <input
            {...register('location')}
            placeholder="e.g. Brisbane / Remote"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">
            Salary
          </label>
          <input
            {...register('salary')}
            placeholder="e.g. 90k–110k AUD"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">
          Notes
        </label>
        <textarea
          {...register('notes')}
          placeholder="Any notes about this application..."
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-200 mb-1">
          Follow-up Date
        </label>
        <input
          type="date"
          {...register('followUpAt')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Adding...' : 'Add Application'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-300 text-gray-400 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}