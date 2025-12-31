'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useActionState } from 'react';

import { montserrat } from '@/app/ui/fonts';
import { loginHandler } from '@/app/lib/actions';

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
                <div className="tf-error-notice">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="tf-error-notice-icon">
                        <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z"/>
                    </svg>
                    <span className="tf-error-notice-text">{errorMessage}</span>
                </div>
                
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