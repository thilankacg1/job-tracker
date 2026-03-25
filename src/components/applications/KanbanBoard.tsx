'use client'

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { Application, ApplicationStatus, STATUS_CONFIG } from '@/types'
import StatusBadge from './StatusBadge'
import { MapPin, Calendar } from 'lucide-react'
import Link from 'next/link'

interface Props {
  applications: Application[]
  onStatusChange: (id: string, status: ApplicationStatus) => void
}

const COLUMN_ORDER: ApplicationStatus[] = [
  'APPLIED',
  'PHONE_SCREEN',
  'INTERVIEW',
  'TECHNICAL_TEST',
  'FINAL_ROUND',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
]

export default function KanbanBoard({ applications, onStatusChange }: Props) {
  const getApplicationsByStatus = (status: ApplicationStatus) =>
    applications.filter((a) => a.status === status)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newStatus = result.destination.droppableId as ApplicationStatus
    const appId = result.draggableId

    const app = applications.find((a) => a.id === appId)
    if (!app || app.status === newStatus) return

    onStatusChange(appId, newStatus)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMN_ORDER.map((status) => {
          const columnApps = getApplicationsByStatus(status)
          const config = STATUS_CONFIG[status]

          return (
            <div
              key={status}
              className="shrink-0 w-64 bg-gray-100 rounded-xl p-3"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${config.color}`}>
                  {config.label}
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {columnApps.length}
                </span>
              </div>

              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-20 rounded-lg transition ${
                      snapshot.isDraggingOver ? 'bg-gray-200' : ''
                    }`}
                  >
                    {columnApps.map((app, index) => (
                      <Draggable key={app.id} draggableId={app.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white border border-gray-200 rounded-lg p-3 mb-2 cursor-grab active:cursor-grabbing transition ${
                              snapshot.isDragging
                                ? 'shadow-lg rotate-1 border-gray-300'
                                : 'hover:shadow-sm hover:border-gray-300'
                            }`}
                          >
                            <Link
                              href={`/dashboard/applications/${app.id}`}
                              onClick={(e) => {
                                if (snapshot.isDragging) e.preventDefault()
                              }}
                            >
                              <p className="font-semibold text-sm text-gray-900 mb-0.5">
                                {app.company}
                              </p>
                              <p className="text-xs text-gray-500 mb-2">
                                {app.role}
                              </p>
                              <div className="flex flex-col gap-1 text-xs text-gray-400">
                                {app.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {app.location}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(app.appliedAt).toLocaleDateString('en-AU', {
                                    day: 'numeric',
                                    month: 'short',
                                  })}
                                </span>
                              </div>
                            </Link>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    {columnApps.length === 0 && !snapshot.isDraggingOver && (
                      <div className="text-center py-4 text-xs text-gray-300">
                        Drop here
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}