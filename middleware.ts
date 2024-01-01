import {auth} from './auth';
import {DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes} from './routes';

export default auth(req => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // The order of these checks is important

  // Don't do anything on api auth route
  if (isApiAuthRoute) {
    return null;
  }

  // Do nothing unless the user is logged in, then redirect to the default login page
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // Redirect to login page if the user isn't logged in and the route isn't public
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  return null;
});

// Apply middleware to URLs that:
// 1. Don't end in a file extension and aren't part of Next.js's '_next' routing
// 2. Match the root URL ('/')
// 3. Start with '/api' or '/trpc', followed by any characters
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
