import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {TextInput} from 'react-materialize';
import Swal from 'sweetalert2';
import FormPage from './FormPage';
import ThisButton from './ThisButton';

export default (props)=>{   
    const [redirect, setRedirect]=useState(false);

    const [nombreDeUsuario, setNombreDeUsuario]=useState('');
    const [correo, setCorreo]=useState('');
    const [contraseña, setContraseña]=useState('');
    const [contraseñaRepetida, setContraseñaRepetida]=useState('');

    const handleUserNameChange=(event)=>{
        setNombreDeUsuario(event.target.value);
    }

    const handleEmailChange=(event)=>{
        setCorreo(event.target.value);
    }

    const handlePasswordChange=(event)=>{
        setContraseña(event.target.value);
    }

    const handleRepeatedPasswordChange=(event)=>{
        setContraseñaRepetida(event.target.value);
    }

    const handleRegisterClick=()=>{
        const formData=new FormData();

        formData.append('NombreDeUsuario', nombreDeUsuario);
        formData.append('Correo', correo);
        formData.append('Contraseña', contraseña);
        
        let url=`https://caba-diario-backend.herokuapp.com/register/usuarios`;

        fetch(url, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(
            response => response.json()
        ).then(
            data => {
                if (data.status==='Ok.') {
                    props.handleLoginSuccess(data.loggedUser);

                    Swal.fire({
                        text: data.message,
                        icon: 'success'
                    })

                    setRedirect(true);
                } else {
                    Swal.fire({
                        text: data.message,
                        icon: 'error'
                    })
                }
            }
        ).catch(
            error => {
                console.log('Error');
        });
    }

    let pErrorStyle={
        color: 'red'
    }

    let aStyle={
        textDecoration: 'underline'
    }

    return(
        !redirect ?
            <div
                className='container'
            >
                <FormPage title='Registrarse'>
                    <TextInput
                        icon="person"
                        id="register-username"
                        label="Nombre de Usuario"
                        value={nombreDeUsuario}
                        onChange={handleUserNameChange}
                    />

                    <TextInput
                        icon="email"
                        id="register-email"
                        label="Email"
                        value={correo}
                        onChange={handleEmailChange}
                    />

                    <TextInput
                        icon="lock"
                        id="register-pass"
                        label="Password"
                        value={contraseña}
                        onChange={handlePasswordChange}
                        password
                    />

                    <TextInput
                        icon="lock"
                        id="register-repeatpass"
                        label="Repetir Password"
                        value={contraseñaRepetida}
                        onChange={handleRepeatedPasswordChange}
                        password
                    />

                    {
                        contraseña!==contraseñaRepetida &&
                            <p
                                style={pErrorStyle}
                            >
                                Las contraseñas no coinciden.
                            </p>
                    }

                    <p>
                        {'¿Ya estás registrado? '}

                        <a
                            className='modal-trigger'
                            href='#login-modal'
                            style={aStyle}
                        >
                            Iniciá sesión
                        </a>
                    </p>
                    
                    <ThisButton
                        onClick={handleRegisterClick}
                        disabled={contraseña!==contraseñaRepetida}
                    >
                        Confirmar registro
                    </ThisButton>
                </FormPage>
            </div>
        :
            <Redirect to='/'/>
    )
}