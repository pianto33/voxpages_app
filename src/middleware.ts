import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Skip all paths that should not be internationalized.
  // This enables the middleware to catch paths like `/home` and redirect them to `/[locale]/home`.
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
