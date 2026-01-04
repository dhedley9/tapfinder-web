import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';

import { AuthApi } from '@/app/lib/api/AuthApi';
import { AccountApi } from '@/app/lib/api/AccountApi';
import { ApiError, HttpError, NetworkError } from '@/app/lib/api/errors';

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

                    try{
                        const api = new AuthApi();

                        const response = await api.login( email, password );

                        const accountApi = new AccountApi();

                        const userResponse = await accountApi.getAccount( response.token );

                        const user = {
                            token: response.token,
                            firstName: userResponse.firstName,
                            lastName: userResponse.lastName,
                            email: userResponse.email
                        };

                        return user;
                    }
                    catch( error ) {
                        
                        if( error instanceof ApiError ) {
                            return null;
                        }

                        throw error;
                    }
                }
                
                return null;
            },
        }),
    ],
});