'use client';

import { useActionState } from 'react';
import { verifyEmailHandler, VerifyEmailActionState } from '@/app/lib/actions/verify-email-handler';

import ErrorNotice from '@/app/ui/error-notice';
import VerificationCodeField from './fields/verification-code-field';

export default function VerifyEmailForm( props: { email: string } ) {

    const label = `Enter the code sent to : ${props.email}`;

    const state: VerifyEmailActionState = {
        error: null,
        values: {
            code: ''
        }
    };

    const [ formResult, action, isPending] = useActionState( verifyEmailHandler, state );

    return (
        <form className="tf-auth-page-form" action={action}>

            { formResult?.error && (
                formResult.error.map((message) => (
                    <ErrorNotice key={message} message={message} />
                ))
            )}

            <VerificationCodeField length={6} label={label} separator={true} />

            <button className="tf-button" type="submit">Verify Account</button>
        </form>
    );
}