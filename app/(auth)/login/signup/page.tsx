import Image from 'next/image';
import Link from 'next/link';

import { montserrat } from '@/app/ui/fonts';
import RegisterForm from '@/app/ui/auth/register-form';

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

            <h1 className={ montserrat.className }>Welcome to TapFinder!</h1>

           <RegisterForm />

            <div className="tf-auth-page-signup">
                <h2 className="tf-auth-page-signup-heading">Already have an account?</h2>
                <Link className="tf-auth-page-signup-link" href={`/login`}>Sign in now &gt;</Link>
            </div>
        </div>
    )
}