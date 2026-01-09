'use client'

import Sidebar from '@/components/Sidebar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

// Context untuk mobile menu
const MobileMenuContext = createContext<{
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}>({
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: () => {}
})

export const useMobileMenu = () => useContext(MobileMenuContext)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <MobileMenuContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen }}>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </MobileMenuContext.Provider>
  )
}
