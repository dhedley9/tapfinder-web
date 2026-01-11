'use client';

import { useActionState } from 'react';
import { registerHandler, RegisterActionState } from '@/app/lib/actions/register-handler';

import ErrorNotice from '@/app/ui/error-notice';
import PasswordField from './fields/password-field';

export default function RegisterForm() {

    const state: RegisterActionState = {
        error: null,
        values: {
            email: '',
            first_name: '',
            last_name: ''
        }
    };

    const [ formResult, action, isPending] = useActionState( registerHandler, state );

    return (
        <form className="tf-auth-page-form" action={action}>

            { formResult?.error && (
                formResult.error.map((message) => (
                    <ErrorNotice key={message} message={message} />
                ))
            )}

            <div className="tf-auth-page-form-field">
                <label htmlFor="signup_email">Email Address:</label>
                
                <input type="text" id="signup_email" name="email" required={true} defaultValue={ formResult.values.email } autoComplete="email" />
            </div>

            <div className="tf-auth-page-form-field">
                <label htmlFor="signup_first_name">First Name:</label>
                
                <input type="text" id="signup_first_name" name="first_name" required={true} defaultValue={ formResult.values.first_name } autoComplete="given-name" />
            </div>

            <div className="tf-auth-page-form-field">
                <label htmlFor="signup_last_name">Last Name:</label>
                
                <input type="text" id="signup_last_name" name="last_name" required={true} defaultValue={ formResult.values.last_name } autoComplete="family-name" />
            </div>

            <div className="tf-auth-page-form-field">
                <label htmlFor="signup_password">Password:</label>
                
                <PasswordField fieldId="signup_password" fieldName="password" fieldAutocomplete="new-password" />
            </div>

            <button className="tf-button" type="submit">Create Account</button>
        </form>
    );
}