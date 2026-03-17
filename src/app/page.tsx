import Link from 'next/link'
import { Briefcase, BarChart2, Columns, ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            <span className="font-bold text-gray-900">Job Tracker</span>
          </div>
          <Link
            href="/login"
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          Built by a developer actively job hunting in Australia
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Stop losing track of<br />
          <span className="text-gray-400">your job applications</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          A simple, focused tool to track every application, follow up on time,
          and land your next role faster.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            Start Tracking Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Try demo →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Everything you need to stay organised
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: 'Track Applications',
                desc: 'Log every job you apply to with company, role, salary, location and notes in one place.',
              },
              {
                icon: <Columns className="w-6 h-6" />,
                title: 'Kanban Board',
                desc: 'Visualise your pipeline. Drag and drop applications as they progress through each stage.',
              },
              {
                icon: <BarChart2 className="w-6 h-6" />,
                title: 'Track Your Stats',
                desc: 'See your response rate, interview count and offers at a glance from your dashboard.',
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-xl mb-4 text-gray-700">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Built with a modern stack
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto text-sm">
            This project was built as part of a portfolio to demonstrate
            full-stack development skills using the latest technologies.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Next.js 14',
              'TypeScript',
              'Prisma',
              'PostgreSQL',
              'NextAuth.js',
              'Tailwind CSS',
              'Vercel',
            ].map((tech) => (
              <span
                key={tech}
                className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to organise your job search?
          </h2>
          <p className="text-gray-400 mb-8 text-sm">
            Free to use. No credit card required.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Job Tracker
          </div>
          <p>Built by Thilanka — Brisbane, Australia</p>
        </div>
      </footer>

    </div>
  )
}