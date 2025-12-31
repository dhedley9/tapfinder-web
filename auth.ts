import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from "zod";
 
export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize( credentials ) {

                const credentialsTemplate = {
                    email: z.email(),
                    password: z.string()
                };

                const parsedCredentials = z.object( credentialsTemplate ).safeParse( credentials );

                if( parsedCredentials.success ) {

                    const { email, password } = parsedCredentials.data;

                    const url = process.env.API_URL + '/auth/login';

                    const args = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    }

                    try {

                        const response: Response = await fetch( url, args );
                        const body = await response.json();

                        console.log( response );
                        console.log( body );

                        if( response.status !== 200 ) {
                            console.log( response.statusText );

                            // TODO: Custom error type
                            throw new Error( 'Something went wrong' );
                        }

                        const user = {
                            token: body.token,
                            firstName: 'TODO',
                            lastName: 'TODO',
                            email: 'TODO'
                        }

                        return user;
                    }
                    catch( error ) {
                        console.log( 'Fetch() error' );

                        // TODO: Custom error type
                        throw new Error( 'Something went wrong' );
                    }
                }
                
                return null;
            },
        }),
    ],
});