import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware untuk protect dashboard routes
  // Authentication check dilakukan di client-side (dashboard/layout.tsx)
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
