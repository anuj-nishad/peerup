import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware()

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - static files (/_next, /images, etc.)
     * - Clerk auth routes
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|sign-in|sign-up|api/webhook).*)",
  ],
};
