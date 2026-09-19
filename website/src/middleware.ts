import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static files, Next.js internal paths, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/'
  ) {
    return NextResponse.next();
  }

  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/redirects/resolve?path=${encodeURIComponent(pathname)}`,
      { next: { revalidate: 10 } }
    );

    if (res.ok) {
      const data = await res.json();
      if (data.matched && data.to) {
        const destinationUrl = new URL(data.to, request.url);
        return NextResponse.redirect(destinationUrl, data.code || 301);
      }
    }
  } catch (_) {
    // Graceful fallback if backend is momentarily unreachable
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
