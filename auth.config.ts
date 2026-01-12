import type { NextAuthConfig } from 'next-auth';
import type { User } from '@/app/lib/definitions';
import { AccountApi } from '@/app/lib/api/AccountApi';
 
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        
        authorized( { auth, request: { nextUrl } } ) {

            const user = auth?.user as User | undefined;

            const isLoginPage  = nextUrl.pathname.startsWith( '/login' );
            const isLogoutPage = nextUrl.pathname.startsWith( '/logout' );
            const isVerifyPage = nextUrl.pathname.startsWith( '/login/verify' );

            if( isLogoutPage ) {
                return true;
            }

            if( user && !user.emailVerified && !isVerifyPage ) {
                return Response.redirect( new URL( '/login/verify', nextUrl ) );
            }

            if( isVerifyPage && user && user.emailVerified ) {
                return Response.redirect( new URL( '/account', nextUrl ) );
            }

            if( isVerifyPage && !user ) {
                return Response.redirect( new URL( '/login', nextUrl ) );
            }

            if( user && isLoginPage && !isVerifyPage ) {
                return Response.redirect( new URL( '/account', nextUrl ) );
            }

            return true;
        },

        async jwt( { token, user, trigger } ) {

            if( user ) {
                token.user = user;
            }

            // Manually trigger refresh of user details
            if( trigger === 'update' && token.user ) {

                const tokenUser  = token.user as User;
                const accountApi = new AccountApi();

                const userResponse = await accountApi.getAccount( tokenUser.token );

                const verified = userResponse.emailValidated ? new Date() : null;

                const updatedUser: User = {
                    token: tokenUser.token,
                    id: userResponse.id.toString(), // Required for NextAuth
                    firstName: userResponse.firstName,
                    lastName: userResponse.lastName,
                    email: userResponse.email,
                    emailVerified: verified,
                };

                token.user = updatedUser;
            }

            return token;
        },

        async session( { session, token } ) {
            
            session.user = token.user as User;

            return session;
        },

        async redirect( { url, baseUrl } ) {

            if( url === `${baseUrl}/login` ) {
                return `${baseUrl}/login/verify`;
            }

            return url;
        },
    },
    providers: [], // This is overwritten in auth.ts
} satisfies NextAuthConfig;