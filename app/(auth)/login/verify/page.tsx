import Image from 'next/image';
import Link from 'next/link';

import { montserrat } from '@/app/ui/fonts';

import VerifyEmailForm from '@/app/ui/auth/verify-email-form'; 
import ResendVerifyEmailForm from '@/app/ui/auth/resend-verify-email-form'; 
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

            <div className="tf-auth-page-resend">
                <h2 className="tf-auth-page-resend-heading">Haven't received an email?</h2>

                <ResendVerifyEmailForm />
            </div>
        </div>
    )
}