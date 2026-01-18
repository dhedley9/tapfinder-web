import { RedirectRule } from "@/app/lib/definitions";

// Ordered by specificity top -> bottom
// The first matching rule will be applied

export const redirectRules: RedirectRule[] = [

    // Redirect: (any) => /login/2fa
    {
        when: ( { user, path } ) => {
            return path !== '/login/2fa' && !!user && user.twoFactorEnabled && !user.twoFactorVerified 
        },
        redirectTo: '/login/2fa'
    },

    // Redirect: (any) => /login/verify
    {
        when: ( { user, path } ) => {
            return path !== '/login/verify' && path !== '/login/2fa' && !!user && !user.emailVerified 
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

    // Redirect: /login/2fa/enable => /account
    // Redirect: /login/2fa/configure => /account
    // Redirect: /login/2fa/verify => /account
    {
        when: ( { user, path } ) => {
            return ( path === '/login/2fa/enable' ||  path === '/login/2fa/configure' || path === '/login/2fa/verify'  ) 
            && !!user
            && user.twoFactorEnabled
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