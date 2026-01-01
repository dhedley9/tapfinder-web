'use client';

import { useActionState } from 'react';
import { loginHandler, LoginActionState } from '@/app/lib/actions/login-handler';
import Link from 'next/link';

import ErrorNotice from '@/app/ui/error-notice';
import PasswordField from './password-field';

export default function LoginForm() {

    const initialState: LoginActionState = {
        error: null,
        values: {
            email: '',
        },
    };

    const [ formResult, action, isPending] = useActionState( loginHandler, initialState );

    return (
        <form className="tf-auth-page-form" action={action}>

            { formResult?.error && (
                <ErrorNotice message={ formResult.error } />
            )}

            <div className="tf-auth-page-form-field">
                <label htmlFor="login_email">Email Address:</label>
                
                <input type="text" id="login_email" name="email" required={true} defaultValue={ formResult.values.email } autoComplete="on" />
            </div>

            <div className="tf-auth-page-form-field">
                <label htmlFor="login_password">Password:</label>
                
                <PasswordField fieldId="login_password" fieldName="password" />
            </div>

            <Link className="tf-auth-page-forgot" href={`/login/reset`}>Forgotten your password?</Link>

            <button className="tf-button" type="submit">Sign In</button>
        </form>
    );
}