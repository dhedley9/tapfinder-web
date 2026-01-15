'use server';

import { AuthApi } from '@/app/lib/api/AuthApi';
import { ApiError, HttpError, NetworkError } from '@/app/lib/api/errors';
import { auth } from "@/auth";  
import { User } from '@/app/lib/definitions';

export async function configureAppFactor() {

    const session = await auth();

    if( !session || !session.user ) {
        return 'You are not logged in';
    }

    const user = session.user as User;

    const api = new AuthApi();

    try{
        return await api.configureAppFactor( user.token );
    }
    catch( error ) {
        
        if( error instanceof ApiError ) {
            return error.messages;
        }
        else{
            console.log( error );
            return 'Something went wrong';
        }
    }
}