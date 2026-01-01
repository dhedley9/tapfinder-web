'use client';

import { useActionState } from 'react';
import { loginHandler } from '@/app/lib/actions';
import Link from 'next/link';

import ErrorNotice from '@/app/ui/error-notice';

export default function LoginForm() {

    const [ errorMessage, action, isPending] = useActionState( loginHandler, undefined );

    return (
        <form className="tf-auth-page-form" action={action}>

            { errorMessage && (
                <ErrorNotice message={errorMessage} />
            )}

            <div className="tf-auth-page-form-field">
                <label htmlFor="login_email">Email Address:</label>
                
                <input type="text" id="login_email" name="email" required={true} autoComplete="on" />
            </div>

            <div className="tf-auth-page-form-field">
                <label htmlFor="login_password">Password:</label>
                
                <input type="text" id="login_password" name="password" required={true}  />
            </div>

            <Link className="tf-auth-page-forgot" href={`/login/reset`}>Forgotten your password?</Link>

            <button className="tf-button" type="submit">Sign In</button>
        </form>
    );
}