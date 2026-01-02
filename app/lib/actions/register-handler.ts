'use server';

import { z } from 'zod';

import { AuthApi } from '@/app/lib/api/AuthApi';
import { AuthError } from 'next-auth';
import { ApiError, HttpError, NetworkError } from '@/app/lib/api/errors';
import { signIn } from '@/auth';

export type RegisterActionState = {
    error: string[] | null;
    values: {
        email: string;
        first_name: string,
        last_name: string,
    };
};

export async function registerHandler( prevState: RegisterActionState, formData: FormData ) {

    const state: RegisterActionState = {
        error: null,
        values: {
            email: '',
            first_name: '',
            last_name: ''
        }
    };

    const rawValues = {
        email: formData.get( 'email' ),
        firstName: formData.get( 'first_name' ),
        lastName: formData.get( 'last_name' ),
        password: formData.get( 'password' ) 
    }

    const template = {
        email: z.email(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string()
    };

    const parsedValues = z.object( template ).safeParse( rawValues );

    if( !parsedValues.success ) {
        state.error = [ 'Invalid values' ];
        return state;
    }

    const { email, firstName, lastName, password } = parsedValues.data;

    state.values.email      = email;
    state.values.first_name = firstName;
    state.values.last_name  = lastName;

    const api = new AuthApi();

    try{
        const response = await api.register( email, password, firstName, lastName );
    }
    catch( error ) {
        
        if( error instanceof ApiError ) {
            state.error = error.messages;
        }
        else{
            state.error = [ 'Something went wrong' ];
        }

        return state;
    }

    const logins = { email, password };

    try{
        await signIn( 'credentials', logins );
    }
    catch( error ) {

        if( error instanceof AuthError ) {
            state.error = [ 'Something went wrong' ];
            return state;
        }
        
        throw error;
    }

    return state;
}