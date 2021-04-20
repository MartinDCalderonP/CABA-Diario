import React from 'react';
import {TextInput} from 'react-materialize';
import FormPage from './FormPage';
import ThisButton from './ThisButton';

export default ()=>{
    return(
        <FormPage
            title='Recordar contraseña'
        >
            <TextInput
                icon="email"
                id="remember-pass-email"
                label="Email"
                validate
            />

            <p>
                Ingrese su email y le enviaremos información para recuperar su contraseña.
            </p>

            <ThisButton>
                Confirmar email
            </ThisButton>
        </FormPage>
    )
}