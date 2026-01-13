import Image from 'next/image';
import Link from 'next/link';

import { montserrat } from '@/app/ui/fonts';
import LoginForm from '@/app/ui/auth/login-form';

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

            <div className="tf-2fa-enable">
                <h1 className={ montserrat.className }>Secure your account</h1>

                <p className="tf-2fa-enable-subheading">Add an extra layer of protection to your account by enabling two-factor authentication.</p>
                
                <p className="tf-2fa-enable-bold">How does it work?</p>

                <ol>
                    <li>Login with your email & password as normal</li>
                    <li>Enter the time-limited 6 digit code from your authenticator app</li>
                    <li>Done!</li>
                </ol>

                <Link className="tf-button" href={`/login/2fa/configure`}>Set Up Two-Factor Authentication</Link>

                <div className="tf-auth-page-signup">
                    <h2 className="tf-auth-page-signup-heading">Or:</h2>
                    <Link className="tf-auth-page-signup-link" href={`/account`}>Continue without 2FA &gt;</Link>
                </div>
            </div>
        </div>
    )
}