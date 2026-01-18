'use client';

import { useActionState } from 'react';

import ErrorNotice from '@/app/ui/error-notice';
import { montserrat } from '@/app/ui/fonts';
import VerificationCodeField from '@/app/ui/auth/fields/verification-code-field';
import { twoFactorHandler, TwoFactorActionState } from '@/app/lib/actions/two-factor-handler';

export default function TwoFactorForm() {

    const state: TwoFactorActionState = {
        error: null,
        values: {
            code: ''
        }
    };

    const [ formResult, action, isPending] = useActionState( twoFactorHandler, state );

    return (
        <form className="tf-2fa-submit" action={ action }>
            <h1 className={ montserrat.className }>Two-Factor Authentication</h1>

            { formResult?.error && (
                formResult.error.map((message) => (
                    <ErrorNotice key={message} message={message} />
                ))
            )}

            <p className="tf-2fa-submit-subheading">Enter the code from your authenticator app.</p>
            
            <VerificationCodeField length={6} separator={true} />

            <div className="tf-2fa-submit-button-wrap">
                <button className="tf-button" type="submit">Submit &gt;</button>
            </div>
            
        </form>
    );
}