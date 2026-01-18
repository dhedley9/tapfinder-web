import type { NextAuthConfig } from 'next-auth';
import type { User, RedirectRuleArgs } from '@/app/lib/definitions';
import { AccountApi } from '@/app/lib/api/AccountApi';
import { redirectRules } from '@/auth.redirects';
 
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        
        authorized( { auth, request: { nextUrl } } ) {

            const user         = auth?.user as User | undefined;
            const isLogoutPage = nextUrl.pathname.startsWith( '/logout' );

            // Always short-circuit the logout page
            if( isLogoutPage ) {
                return true;
            }

            const args: RedirectRuleArgs = {
                user: user,
                path: nextUrl.pathname
            }

            for( let i = 0; i < redirectRules.length; i++ ) {

                const rule = redirectRules[i];

                if( rule.when( args) ) {
                    return Response.redirect( new URL( rule.redirectTo, nextUrl ) );
                }
            }

            return true;
        },

        async jwt( { token, user, trigger, session } ) {

            if( user ) {
                token.user = user;
            }

            // Manually trigger refresh of user details
            if( trigger === 'update' && token.user ) {

                const tokenUser  = token.user as User;
                const accountApi = new AccountApi();

                // If the two factor token is stored in the session (two factor has just been completed)
                // Replace the temporary access token with the full token and reload the user
                if( session.twoFactorToken ) {
                    tokenUser.token = session.twoFactorToken;
                    delete session.twoFactorToken;
                }

                const userResponse = await accountApi.getAccount( tokenUser.token );

                const verified = userResponse.emailValidated ? new Date() : null;

                const updatedUser: User = {
                    token: tokenUser.token,
                    id: userResponse.id.toString(), // Required for NextAuth
                    firstName: userResponse.firstName,
                    lastName: userResponse.lastName,
                    email: userResponse.email,
                    emailVerified: verified,
                    twoFactorEnabled: userResponse.twoFactorEnabled,
                    twoFactorVerified: tokenUser.twoFactorVerified,
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