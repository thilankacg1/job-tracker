# Job Tracker

A full-stack web application to track job applications throughout the hiring process. Built as a portfolio project while actively job hunting in Australia.

🔗 **Live Demo:** https://job-tracker-one-omega.vercel.app

---

## Features

- **Google Authentication** — secure sign in with your Google account
- **Track Applications** — log every job with company, role, salary, location, job URL and notes
- **Kanban Board** — drag and drop applications across status columns
- **List View** — sortable, searchable list of all applications
- **Status Tracking** — Applied → Phone Screen → Interview → Technical Test → Final Round → Offer / Rejected
- **Follow-up Reminders** — set a follow-up date and get overdue alerts on cards
- **Stats Dashboard** — track total applications, interviews, offers and response rate
- **Search & Filter** — filter by status, search by company or role, sort by date or name
- **Fully Responsive** — works on mobile and desktop

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 5 |
| Authentication | NextAuth.js v4 (Google OAuth) |
| Icons | Lucide React |
| Drag & Drop | @hello-pangea/dnd |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |

---

## Screenshots

> Add screenshots here after taking them

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) account (free)
- A [Google Cloud](https://console.cloud.google.com) project with OAuth credentials

### Installation

1. Clone the repository
```bash
git clone https://github.com/thilankacg1/job-tracker.git
cd job-tracker
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables — create a `.env` file in the root:
```bash
DATABASE_URL="your-neon-connection-string"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. Push the database schema
```bash
npx prisma@5.22.0 db push
```

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth API route
│   │   └── applications/         # CRUD API routes
│   ├── dashboard/                # Protected dashboard pages
│   ├── login/                    # Login page
│   └── page.tsx                  # Landing page
├── components/
│   └── applications/             # ApplicationCard, Form, KanbanBoard etc.
├── lib/
│   ├── auth.ts                   # NextAuth config
│   └── prisma.ts                 # Prisma client
└── types/
    └── index.ts                  # Shared TypeScript types
```

---

## What I Learned

- Building a full-stack app with **Next.js App Router** and API routes
- Setting up **Google OAuth** with NextAuth.js and Prisma adapter
- **Database design** with Prisma and PostgreSQL on Neon
- **Type-safe forms** with React Hook Form and Zod validation
- **Drag and drop** UI with @hello-pangea/dnd
- Deploying a full-stack Next.js app to **Vercel** with environment variables

---

## Author

**Thilanka** — Frontend / Full Stack Developer based in Brisbane, Australia

- LinkedIn: https://www.linkedin.com/in/thilankacg/
- GitHub: [@thilankacg1](https://github.com/thilankacg1)

---

## Roadmap

- [ ] AI cover letter generator using OpenAI API
- [ ] Email reminders for follow-up dates
- [ ] Export applications to CSV
- [ ] Interview notes and timeline per application