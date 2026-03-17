import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET — fetch all applications for the logged in user
export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(applications)
}

// POST — create a new application
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { company, role, jobUrl, location, salary, notes } = body

  if (!company || !role) {
    return NextResponse.json(
      { error: 'Company and role are required' },
      { status: 400 }
    )
  }

  const application = await prisma.application.create({
    data: {
      userId: session.user.id,
      company,
      role,
      jobUrl,
      location,
      salary,
      notes,
    },
  })

  return NextResponse.json(application, { status: 201 })
}