import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n';
const PUBLIC_FILE = /\.(.*)$/
 
import {withAuth} from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
 
const publicPages = ['/'];
 
const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale
});
 
const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({token}) => token != null
    },
    pages: {
      signIn: '/'
    }
  }
);
export default function middleware(req: NextRequest) {
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return null;
    }
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages
        .flatMap((p) => (p === '/' ? ['', '/'] : p))
        .join('|')})/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
    
    if (isPublicPage) {
        return intlMiddleware(req);
    } 
    else 
    {
        return (authMiddleware as any)(req);
    }
}
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};