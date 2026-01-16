import { RedirectRule } from "@/app/lib/definitions";

// Ordered by specificity top -> bottom
// The first matching rule will be applied

export const redirectRules: RedirectRule[] = [

    // Redirect: (any) => /login/verify
    {
        when: ( { user, path } ) => {
            return path !== '/login/verify' && !!user && !user.emailVerified 
        },
        redirectTo: '/login/verify'
    },

    // Redirect: /login/verify => /account
    {
        when: ( { user, path } ) => {
            return path === '/login/verify' && !!user && !!user.emailVerified;
        },
        redirectTo: '/account'
    },

    // Redirect: /login/verify => /login
    {
        when: ( { user, path } ) => {
            return path === '/login/verify' && !user;
        },
        redirectTo: '/login'
    },

    // Redirect: /login/2fa => /login
    {
        when: ( { user, path } ) => {
            return path.startsWith( '/login/2fa' ) && !user;
        },
        redirectTo: '/login'
    },

    // Redirect: /login => /account
    {
        when: ( { user, path } ) => {
            return path === '/login' && !!user;
        },
        redirectTo: '/account'
    }
];