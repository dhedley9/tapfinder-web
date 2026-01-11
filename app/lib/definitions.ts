export type User = {
    token: string,
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    emailVerified: Date | null
}