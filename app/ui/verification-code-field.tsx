'use client';

import { useState, useRef } from "react";

type VerificationCodeFieldProps = {
    length: number,
    label?: string,
    separator?: boolean,
}

export default function VerificationCodeField( props: VerificationCodeFieldProps ) {

    const [ values, setValues ] = useState( Array( props.length ).fill("") );
    const inputsRef             = useRef<(HTMLInputElement | null)[]>([]);

    let showSeparator = !!props.separator;
    let groups        = showSeparator && props.length % 2 === 0 ? 2 : 1;
    let digits        = groups === 2 ? props.length / 2 : props.length;
    let counter       = 1;

    let grid = Array.from({ length: groups }, () =>
        Array.from({ length: digits }, () => counter++)
    );

    const handleChange = () => {}

    const handleKeyDown = ( index: number, value: string ) => {

        const keys = [ 'Backspace', 'ArrowLeft', 'ArrowRight' ];

        if( keys.includes( value ) ) {
            return navigate( index, value );
        }

        // Only allow a single digit number
        if( !/^\d?$/.test( value ) ) {
            return;
        }

        // Set the input value
        const newValues = [ ...values ];
        newValues[index] = value;
        setValues( newValues );

        // Move focus to the next element
        if (value && index < props.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    }

    const handlePaste = ( index: number, value: string ) => {

        if( value.length <= 0 ) {
            return;
        }

        const newValues = [ ...values ];

        let currentIndex = 0;

        for( let i = 0; i < value.length; i++ ) {

            const digit = value[i];

            if( !/^\d?$/.test( digit ) ) {
                continue;
            }

            newValues[currentIndex] = digit;

            currentIndex++;
        }

        setValues( newValues );

        inputsRef.current[currentIndex - 1]?.focus();
    }

    const navigate = ( index: number, value: string ) => {

        let newIndex = index;

        if( value === 'ArrowLeft' ) {
            newIndex--;
        }
        else if( value === 'ArrowRight' ) {
            newIndex++;
        }
        else if( value === 'Backspace' ) {
            
            if( values[index] === '' ) {
                newIndex--;
            }
            else{

                const newValues = [ ...values ];
                newValues[index] = '';
                setValues( newValues );

                return;
            }
        }

        inputsRef.current[newIndex]?.focus();
    }

    return(
        <div className="tf-verification-code-wrap">

            { props.label && (
                <div className="tf-verification-code-label">{ props.label }</div>
            )}

            <div className="tf-verification-code">

                { grid.map( ( group, groupIndex ) => {

                    const isLast = groupIndex === grid.length - 1;

                    return( 
                        <div 
                            className="tf-verification-code-digits"
                            key={ `verification_code_group_${groupIndex}` }
                        >
                            { group.map( ( digit, digitIndex ) => {

                                const index = digit - 1;
                            
                                return (
                                    <input 
                                        key={ 'verification_code_digit_' + digit }
                                        type="text" 
                                        inputMode="numeric"
                                        name={ 'verification_code_digit_' + digit }
                                        value={ values[index] }
                                        ref={ (el) => { inputsRef.current[index] = el } }
                                        required
                                        maxLength={1}
                                        onChange={ (e) => handleChange() }
                                        onKeyDown={ (e) => handleKeyDown( index, e.key ) }
                                        onPaste={ (e) => handlePaste( index,  e.clipboardData.getData( 'text' ) ) }
                                    />
                                );
                            })}
                        
                            { !isLast && (
                                <div className="tf-verification-code-separator">-</div>
                            )}
                        </div>
                    )
                })}
            </div>
         </div>
    );
}