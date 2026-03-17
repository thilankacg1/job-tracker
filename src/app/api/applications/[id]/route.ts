import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET — fetch a single application
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const application = await prisma.application.findFirst({
    where: {
      id: id,
      userId: session.user.id,
    },
  })

  if (!application) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(application)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  // Clean up the data before saving to database
  const data = {
    ...body,
    // Convert empty string to null, or parse the date string to a Date object
    followUpAt: body.followUpAt
      ? new Date(body.followUpAt)
      : null,
    // Remove empty strings for optional fields
    jobUrl: body.jobUrl || null,
    location: body.location || null,
    salary: body.salary || null,
    notes: body.notes || null,
  }

  try {
    const application = await prisma.application.update({
      where: {
        id: id,
        userId: session.user.id,
      },
      data,
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error('PATCH error:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.application.delete({
    where: {
      id: id,
      userId: session.user.id,
    },
  })

  return NextResponse.json({ success: true })
}