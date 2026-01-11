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

            <h1 className={ montserrat.className }>Welcome Back!</h1>

           <LoginForm />

            <div className="tf-auth-page-signup">
                <h2 className="tf-auth-page-signup-heading">Don't have an account?</h2>
                <Link className="tf-auth-page-signup-link" href={`/login/signup`}>Sign up now &gt;</Link>
            </div>
        </div>
    )
}