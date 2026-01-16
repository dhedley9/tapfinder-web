import Image from 'next/image';
import Link from 'next/link';

import VerifyTwoFactorForm from '@/app/ui/auth/verify-two-factor-form';

export default async function Page() {

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

                <VerifyTwoFactorForm />
            </div>
        </div>
    )
}