import Image from 'next/image';
import Link from 'next/link';

import { montserrat } from '@/app/ui/fonts';

import VerifyEmailForm from '@/app/ui/verify-email-form'; 
import { auth } from "@/auth";  

export default async function Page() {

    const session = await auth();

    if( !session || !session.user ) {
        return;
    }

    const email = session.user.email ? session.user.email : '';
    
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

            <h1 className={ montserrat.className }>Verify your email</h1>

            <VerifyEmailForm email={ email } />

            <div className="tf-auth-page-signup">
                <h2 className="tf-auth-page-signup-heading">Haven't received an email?</h2>
                <Link className="tf-auth-page-signup-link" href={`/login`}>Resend now &gt;</Link>
            </div>
        </div>
    )
}