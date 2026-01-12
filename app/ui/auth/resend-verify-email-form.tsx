'use client';

import { useActionState, useState } from "react";

import { resendVerifyEmailHandler } from '@/app/lib/actions/resend-verify-email-handler';

export default function ResendVerifyEmailForm() {

    const [ formResult, action, isPending ] = useActionState( resendVerifyEmailHandler, undefined );
    const [ isComplete, setIsComplete ] = useState( false );

    let buttonText  = 'Resend now >';
    let buttonClass = '';

    if( isPending ) {
        buttonText  = 'Sending...';
        buttonClass = 'loading';
    }
    else if( isComplete ) {
        buttonText  = 'Sent';
        buttonClass = 'complete';
    }

    const handleSubmit = async () => {

        setIsComplete( false );
        await action();
        setIsComplete( true );
    }

    return(
        <form className="tf-resend-verify-email" action={ handleSubmit }>
            <button className={ 'tf-resend-verify-email-button tf-button ' + buttonClass } disabled={ isPending || isComplete }>
                { buttonText }
            </button>
        </form>
    )
}