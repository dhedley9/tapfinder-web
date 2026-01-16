'use client';

import { useActionState } from 'react';
import Link from 'next/link';

import ErrorNotice from '@/app/ui/error-notice';
import { montserrat } from '@/app/ui/fonts';
import VerificationCodeField from '@/app/ui/auth/fields/verification-code-field';
import { verifyTwoFactorHandler, VerifyTwoFactorActionState } from '@/app/lib/actions/verify-two-factor-handler';

export default function EnableTwoFactorForm() {

    const state: VerifyTwoFactorActionState = {
        error: null,
        values: {
            code: ''
        }
    };

    const [ formResult, action, isPending] = useActionState( verifyTwoFactorHandler, state );

    return (
        <form className="tf-2fa-verify" action={ action }>
            <h1 className={ montserrat.className }>Verify Your Authenticator</h1>

            { formResult?.error && (
                formResult.error.map((message) => (
                    <ErrorNotice key={message} message={message} />
                ))
            )}

            <p className="tf-2fa-verify-subheading">Enter the code from your authenticator app to enable two-factor authentication.</p>
            
            <VerificationCodeField length={6} separator={true} />

            <div className="tf-2fa-verify-button-wrap">
                <button className="tf-button" type="submit">Enable 2FA &gt;</button>
            </div>
            
            <div className="tf-2fa-verify-cancel-wrap">
                <Link className="tf-2fa-verify-cancel" href={`/account`}>Cancel</Link>
            </div>
        </form>
    );
}