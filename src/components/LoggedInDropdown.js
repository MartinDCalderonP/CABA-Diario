import React from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-materialize';
import DefaultPhoto from '../images/usersPhotos/default.png';

export default (props)=>{
    let triggerStyle={
        color: 'var(--colorLetras)',
        margin: '0px 18px'
    }

    let loggedInDropdownStyle={
        backgroundColor: 'var(--colorFondo)',
        border: '1px solid var(--transparentDarkBlue)'
    }

    let imgStyle={
        verticalAlign: 'middle',
        height: '32px',
        width: '32px',
        borderRadius: '50%'
    }

    let salirStyle={
        borderTop: '1px solid var(--transparentDarkBlue)'
    }

    return(
        <>
            <Dropdown
                id="user-dropdown"
                options={{
                    alignment: 'left',
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: false,
                    container: null,
                    coverTrigger: false,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250
                }}
                trigger={
                    <a
                        className='right'
                        href="#!"
                        style={triggerStyle}
                    >
                        <img
                            className="responsive-img"
                            src={props.user.photo || DefaultPhoto}
                            alt={props.user.name}
                            style={imgStyle}
                        />
                    </a>
                }
                style={loggedInDropdownStyle}
            >
                {
                    props.user.role==='Usuario' ?
                        <>
                            <Link
                                to='/Mi-Cuenta'
                            >
                                Mi Cuenta
                            </Link>
                        </>
                    :
                        (
                            props.user.role==='Editor' ?
                                <Link
                                    to='/Notas-A-Editar'
                                >
                                    Notas a Editar
                                </Link>
                            :
                                <Link
                                    to='/Mis-Notas'
                                >
                                    Mis Notas
                                </Link>
                        )
                }
                
                <a
                    href="#!"
                    onClick={props.handleLogout}
                    style={salirStyle}
                >
                    Salir
                </a>
            </Dropdown>

            <style>
                {`
                    .responsive-img:hover{
                        box-shadow: 0px 0px 10px 0px;
                    }

                    #user-dropdown>li{
                        background-color: var(--colorFondo);
                    }

                    #user-dropdown>li>a{
                        color: var(--colorLetras);
                    }
                `}
            </style>
        </>
    )
}