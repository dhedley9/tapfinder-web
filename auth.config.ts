import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized( { auth, request: { nextUrl } } ) {

            const isLoggedIn  = !!auth?.user;
            const isLoginPage = nextUrl.pathname.startsWith('/login');

            if( isLoggedIn && isLoginPage ) {
                
                return Response.redirect( new URL( '/account', nextUrl ) );
            }

            return true;
        },
    },
    providers: [], // This is overwritten in auth.ts
} satisfies NextAuthConfig;