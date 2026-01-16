import Image from 'next/image';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import { montserrat } from '@/app/ui/fonts';
import { configureAppFactor } from '@/app/lib/utils/authUtils';

export default async function Page() {
    
    const result = await configureAppFactor();

    console.log( result );

    // const result = 'Something went wrong';

    // if( typeof result === 'string' ) {
    //     redirect( '/login?error=' + result );
    // }

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

            <div className="tf-2fa-configure">
                <h1 className={ montserrat.className }>Set Up Two-Factor Authentication</h1>

                <p className="tf-2fa-configure-subheading">Scan the QR code below with your authenticator app, or enter the setup key underneath:</p>
                
                <div className="tf-2fa-configure-qrcode">
                    <img src={ result.qrcode } alt="2FA Signup QR Code" />
                </div>
                
                <pre className="tf-2fa-configure-secret">{ result.secret }</pre>

                <div className="tf-2fa-configure-button-wrap">
                    <Link className="tf-button" href={`/login/2fa/verify`}>Continue &gt;</Link>
                </div>
                
                <div className="tf-2fa-configure-cancel-wrap">
                    <Link className="tf-2fa-configure-cancel" href={`/account`}>Cancel</Link>
                </div>
            </div>
        </div>
    )
}