'use server';

import { AuthApi } from '@/app/lib/api/AuthApi';
import { ApiError, HttpError, NetworkError } from '@/app/lib/api/errors';
import { auth, unstable_update } from "@/auth";  
import { User } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';

export type TwoFactorActionState = {
    error: string[] | null;
    values: {
        code: string,
    };
};

export async function twoFactorHandler( prevState: TwoFactorActionState, formData: FormData) {

    // TODO: Standardise form states
    const state: TwoFactorActionState = {
        error: null,
        values: {
            code: ''
        }
    };
    
    const length = 6;
    const digits: string[] = [];

    // TODO: Separate into helper function
    for( let i = 0; i < length; i++ ) {

        const digit = formData.get( 'verification_code_digit_' + ( i + 1 ) );

        if( typeof digit !== 'string' ) {
            continue;
        }

        if( !/^\d?$/.test( digit ) ) {
            continue;
        }

        digits.push( digit );
    }

    if( digits.length !== length ) {

        state.error = ['Code contains missing or invalid digits'];
        state.values.code = digits.join('');

        return state;
    }

    const session = await auth();

    if( !session || !session.user ) {
        
        state.error = [ 'You are not logged in' ];
        state.values.code = digits.join('');

        return state;
    }

    const user = session.user as User;

    const api = new AuthApi();

    try{
        const response = await api.twoFactorVerify( digits.join(''), user.token );

        console.log( 'TWO FACTOR response', response );

        session.twoFactorToken = response.token;

        await unstable_update( session );
    }
    catch( error ) {

        console.log( error );
        
        if( error instanceof ApiError ) {
            state.error = error.messages;
        }
        else{
            state.error = [ 'Something went wrong' ];
        }

        return state;
    }

    redirect( '/account' );
}