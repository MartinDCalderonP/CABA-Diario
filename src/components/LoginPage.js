import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
//Link ^
import {TextInput, Select} from 'react-materialize';
import Swal from 'sweetalert2';
import FormPage from './FormPage';
import ThisButton from './ThisButton';

export default (props)=>{
    const [redirect, setRedirect] = useState(false);

    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('');

    const handleUserChange=(event)=>{
        setNombre(event.target.value);
    }

    const handlePasswordChange=(event)=>{
        setContraseña(event.target.value);
    }

    const handleRoleChange=(event)=>{
        setRol(event.target.value);
    }
    
    const handleLoginClick=()=>{

        let endpoint='';

        rol==='1' ?
            endpoint='/autores'
        :
            endpoint='/editores'
        
        let url=`https://caba-diario-backend.herokuapp.com/auth/${endpoint}`;

        let params={
            user: nombre,
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
                    
                    setRedirect(true);
                } else {
                    Swal.fire({
                        text: data.message,
                        icon: 'error'
                    })
                }
            }
        )
    }

    // let pStyle={
    //     marginTop: '25px',
    //     textDecoration: 'underline'
    // }

    return(
        !redirect ?
            <div
                className='container'
            >
                <FormPage
                    title='Iniciar Sesión'
                >
                    <TextInput
                        icon="email"
                        id="login-page-user"
                        label="Nombre de Usuario o Correo"
                        value={nombre}
                        onChange={handleUserChange}
                    />
                    <TextInput
                        icon="lock"
                        id="login-page-pass"
                        label="Contraseña"
                        password
                        value={contraseña}
                        onChange={handlePasswordChange}
                    />
                    <Select
                        id="role-select"
                        multiple={false}
                        options={{
                            classes: '',
                            dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                            }
                        }}
                        value={rol}
                        onChange={handleRoleChange}
                    >
                        <option
                            disabled
                            value=""
                        >
                            Elija su rol.
                        </option>

                        <option
                            value="1"
                        >
                            Autor
                        </option>

                        <option 
                            value="2"
                        >
                            Editor de Sección
                        </option>
                    </Select>

                    {/* <p
                        style={pStyle}
                    >
                        <Link
                            to='/Recordar-Contraseña'
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </p> */}

                    <ThisButton
                        onClick={handleLoginClick}
                    >
                        Ingresar
                    </ThisButton>
                </FormPage>
            </div>
        :
            rol==='1' ?
                <Redirect to='/Mis-Notas'/>
            :
                <Redirect to='/Notas-a-Editar'/>
    )
}