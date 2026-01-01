'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export type LoginActionState = {
    error: string | null;
    values: {
        email: string;
    };
};

export async function loginHandler( prevState: LoginActionState, formData: FormData ) {

    let state: LoginActionState = {
        error: null,
        values: {
            email: ''
        }
    };

    const email    = formData.get( 'email' ) as string;
    const password = formData.get( 'password' ) as string;

    if( !email || !password ) {
        state.error = 'Email and password are required.';
        return state;
    }

    state.values.email = email;

    try {
        await signIn( 'credentials', formData );
    }
    catch( error ) {

        if( error instanceof AuthError ) {

            switch( error.type ) {
                case 'CredentialsSignin':
                    state.error = 'Invalid credentials.';
                    break;
                default:
                    state.error = 'Something went wrong.';
                    break;
            }

            return state;
        }

        throw error;
    }

    return state;
}