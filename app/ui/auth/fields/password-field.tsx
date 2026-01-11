import { useState } from 'react';

type PasswordFieldProps = {
    fieldId: string,
    fieldName: string
    fieldAutocomplete?: string,
};

export default function PasswordField( props: PasswordFieldProps ) {

    const [ showPassword, setShowPassword ] = useState( false );

    const autocomplete = ( 'fieldAutocomplete' in props ) ? props.fieldAutocomplete : 'password';

    return (
        <div className="tf-password-field">
            <input type={ showPassword ? 'text' : 'password' }  id={ props.fieldId } name={ props.fieldName } required={ true } autoComplete={ autocomplete } />
            <button type="button" onClick={ () => setShowPassword( ( prev ) => !prev ) }>{ showPassword ? 'Hide' : 'Show' }</button>
        </div>
    );
}