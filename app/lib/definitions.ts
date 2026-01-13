export type User = {
    token: string,
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    emailVerified: Date | null
}

export type RedirectRuleArgs = {
    user?: User;
    path: string;
};

export type RedirectRule = {
    when: ( args: RedirectRuleArgs ) => boolean;
    redirectTo: string;
};