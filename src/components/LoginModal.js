import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Modal, TextInput, Icon} from 'react-materialize';
import Swal from 'sweetalert2';
import CloseCross from './CloseCross';
import ThisButton from './ThisButton';

export default (props)=>{
    const [nombreDeUsuario, setNombreDeUsuario]=useState('');
    const [contraseña, setContraseña]=useState('');

    const handleUserNameChange=(event)=>{
        setNombreDeUsuario(event.target.value);
    }

    const handlePasswordChange=(event)=>{
        setContraseña(event.target.value);
    }

    const handleLoginClick=()=>{
        let url=`https://caba-diario-backend.herokuapp.com/auth/usuarios`;

        let params={
            user: nombreDeUsuario,
            password: contraseña
        };

        fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            response=>response.json()
        ).then(
            data=>{
                if (data.status==='Ok.') {
                    props.handleLoginSuccess(data.loggedUser);
                    Swal.fire({
                        text: data.message,
                        icon: 'success'
                    })
                } else {
                    Swal.fire({
                        text: data.message,
                        icon: 'error'
                    })
                }
            }
        )
    }

    let triggerStyle={
        margin: '0px 18px'
    }

    let modalStyle={
        backgroundColor: 'var(--colorFondo)',
        border: '1px solid var(--transparentDarkBlue)',
        borderRadius: '5px'
    }

    let inputsDivStyle={
        marginLeft: '-10px'
    }

    let pStyle={
        textDecoration: 'underline'
    }

    let thisButtonStyle={
        margin: '0 auto'
    }

    return(
        <>
            <Modal
                className='center-align'
                actions={[
                    <CloseCross
                        className='modal-close'
                    />
                ]}
                bottomSheet={false}
                header='Iniciar Sesión'
                id="login-modal"
                open={false}
                options={{
                    dismissible: true,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: true,
                    startingTop: '4%'
                }}
                root={document.getElementById('root')}
                trigger={
                    <a
                        className='right'
                        href='#!'
                        style={triggerStyle}
                    >
                        <Icon
                            className='i-hover'
                        >
                            account_circle
                        </Icon>
                    </a>
                }
                style={modalStyle}
            >
                <div
                    style={inputsDivStyle}
                >
                    <TextInput
                        icon="email"
                        id="login-modal-userName"
                        label="Nombre de Usuario o Correo"
                        value={nombreDeUsuario}
                        onChange={handleUserNameChange}
                    />

                    <TextInput
                        icon="lock"
                        id="login-modal-pass"
                        label="Contraseña"
                        password
                        value={contraseña}
                        onChange={handlePasswordChange}
                    />
                </div>

                <p>
                    <Link
                        to='/Recordar-Contraseña'
                        className='modal-close'
                        style={pStyle}
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </p>

                <p>
                    <Link
                        to='/Registrarse'
                        className='modal-close'
                        style={pStyle}
                    >
                        ¡Registrate en CABA Diario!
                    </Link>
                </p>

                <ThisButton
                    modal='close'
                    onClick={handleLoginClick}
                    style={thisButtonStyle}
                >
                    Ingresar
                </ThisButton>
            </Modal>

            <style>
                {`
                    .modal>.modal-footer{
                        display: inline-block;
                        width: auto;
                        background: transparent;
                        position: absolute;
                        top: 0;
                        right: 0;
                        margin-top: 15px;
                        padding: 0px;
                    }
                `}
            </style>
        </>
    )
}