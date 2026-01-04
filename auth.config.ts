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

        async jwt( { token, user } ) {

            if( user ) {
                token.user = user;
            }

            return token;
        },

        async session( { session, token } ) {
            
            session.user = token.user as User;

            return session;
        },
    },
    providers: [], // This is overwritten in auth.ts
} satisfies NextAuthConfig;