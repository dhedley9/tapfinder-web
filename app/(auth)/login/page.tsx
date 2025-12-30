import Image from 'next/image';
import Link from 'next/link';

import { montserrat } from '@/app/ui/fonts';

export default function Page() {
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

            <form className="tf-auth-page-form">
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