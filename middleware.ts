import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/bills/create'];
// Public routes that don't require authentication
const publicRoutes = ['/'];

export function middleware(request: NextRequest) {
	const isAuthenticated = request.cookies.has('isAuthenticated');
	const { pathname } = request.nextUrl;

	// If trying to access a protected route without authentication
	if (
		protectedRoutes.some((route) => pathname.startsWith(route)) &&
		!isAuthenticated
	) {
		const response = NextResponse.redirect(new URL('/', request.url));
		return response;
	}

	// If authenticated user tries to access login page, redirect to dashboard
	if (publicRoutes.includes(pathname) && isAuthenticated) {
		const response = NextResponse.redirect(new URL('/dashboard', request.url));
		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
