'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useActionState } from 'react';

import { montserrat } from '@/app/ui/fonts';
import { loginHandler } from '@/app/lib/actions';

import ErrorNotice from '@/app/ui/error-notice';

export default function Page() {

    const [ errorMessage, action, isPending] = useActionState( loginHandler, undefined );
    
    return (
        <div className="tf-auth-page">

            <div className="tf-auth-page-logo">
                <Link href={`/`}>
                    <Image
                        src="/tapfinder-logo.png"
                        width={1000}
                        height={257}
                        alt="TapFinder logo"
                    />
                </Link>
            </div>

            <h1 className={ montserrat.className }>Welcome Back!</h1>

            { errorMessage && (
                <ErrorNotice message={errorMessage} />
            )}

            <form className="tf-auth-page-form" action={action}>
                <div className="tf-auth-page-form-field">
                    <label htmlFor="login_email">Email Address:</label>
                    
                    <input type="text" id="login_email" name="email" required={true} autoComplete='on'  />
                </div>

                <div className="tf-auth-page-form-field">
                    <label htmlFor="login_password">Password:</label>
                    
                    <input type="text" id="login_password" name="password" required={true}  />
                </div>

                <Link className="tf-auth-page-forgot" href={`/login/reset`}>Forgotten your password?</Link>

                <button className="tf-button" type="submit">Sign In</button>
            </form>

            <div className="tf-auth-page-signup">
                <h2 className="tf-auth-page-signup-heading">Don't have an account?</h2>
                <Link className="tf-auth-page-signup-link" href={`/login/signup`}>Sign up now &gt;</Link>
            </div>
        </div>
    )
}