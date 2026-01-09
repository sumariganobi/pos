'use client'

import { useMobileMenu } from '@/app/dashboard/layout'

interface PageHeaderProps {
  title: string
  subtitle?: string | React.ReactNode
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu()

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          aria-label="Buka menu"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
            {title}
          </h1>
          {subtitle && (
            <div className="text-sm text-gray-600">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
