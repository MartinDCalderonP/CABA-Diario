import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Button} from 'react-materialize';
import Swal from 'sweetalert2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import AuthorPhoto from './AuthorPhoto';

export default (props)=>{
    const [redirect, setRedirect]=useState(false);

    const handleDeleteClick=()=>{
        Swal.fire({
            title: '¿Está seguro que desea eliminar la nota?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(
            result=>{
                if (result.value) {
                    fetch(`http://localhost:8888/notas/${props.id}`, {
                            method: 'DELETE',
                            credentials: 'include'
                    }).then(
                        response=>response.json()
                    ).then(
                        data =>{
                            if (data.status === 'Ok.') {
                                Swal.fire({
                                    text: data.message,
                                    icon: 'success'
                                });
                                
                                setRedirect(true);
                            }
                            else{
                                Swal.fire({
                                    text : data.message,
                                    icon: 'error'
                                })
                            }
                        }
                    )
                }
            }
        )
    }

    const toLink=(word)=>{
        if (word) {
            let space = / /g;
            let undesirable = /\.|\$|,|"|:/g;

            return word.replace(space, '-').replace(undesirable, '');
        } else {
            return 'not-title';
        }
    }

    let newsUrl=`/${props.section}/${toLink(props.title)}-nid${props.id}`

    let authorUrl=`/Autor/${toLink(props.authorName)}-${props.authorId}`

    let newsCardStyle={
        backgroundColor: 'var(--colorFondo)',
        margin: '0px 10px',
        boxShadow: 'none',
        borderRadius: '0px'
    }

    let imgStyle={
        maxHeight: '200px'
    }

    let cardSectionStyle={
        backgroundColor: 'rgba(0,0,139,0.8)',
        color: '#f5f5f5',
        position: 'absolute',
        top: '0',
        right: '0',
        margin: '15px',
        padding: '5px 10px',
        textTransform: 'uppercase',
        fontSize: '0.85rem'
    }

    let cardNumberStyle={
        ...cardSectionStyle,
        backgroundColor: '#252525',
        left: '0',
        right: 'auto',
        margin: '5px'
    }

    let cardContentStyle={
        padding: '10px 0px'
    }

    let cardTitleStyle={
        fontSize: '1.5rem',
        marginBottom: '5px',
        lineHeight: '1'
    }

    let cardDateStyle={
        display: 'block',
        textAlign: 'right',
        width: '100%',
        fontSize: '0.85rem',
        opacity: '0.75'
    }

    let authorPStyle={
        fontSize: '1rem'
    }

    let authorLinkStyle={
        color: 'var(--colorLetras)',
        fontWeight: 'bold'
    }

    let menuDivStyle={
        marginTop: '10px'
    }

    let buttonStyle={
        backgroundColor: 'var(--colorFondo)',
        color: 'var(--colorLetras)',
        margin: '0px 5px'
    }

    let opinionCardStyle={
        background: 'var(--colorFondo)',
        textAlign: 'center',
        margin: '0px 0px 15px',
        border: '1px solid var(--transparentDarkBlue)',
        borderRadius: '0px',
        padding: '10px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }

    let opinionCardTitleLinkStyle={
        display: 'block'
    }

    let opinionCardTitlePStyle={
        ...cardTitleStyle,
        margin: '10px 0px 20px'
    }

    let authorPhotoStyle={
        margin: '0 auto'
    }

    return(
        !redirect ?
            <>
                {
                    !props.opinion ?
                        <div
                            className={'card' + (props.posted ? ' blocked' : '')}
                            style={newsCardStyle}
                        >
                            <div
                                className='card-image'
                            >
                                <Link
                                    to={newsUrl}
                                >
                                    <img
                                        src={props.img}
                                        alt={props.imgFooter}
                                        style={imgStyle}
                                    />
                                </Link>

                                {
                                    !props.number ?
                                        <Link
                                            className='card-section'
                                            to={'/Sección/' + props.section}
                                            style={cardSectionStyle}
                                        >
                                            {props.section}
                                        </Link>
                                    :
                                        <p
                                            className='card-section'
                                            style={cardNumberStyle}
                                        >
                                            {props.number}
                                        </p>
                                }
                            </div>
                            
                            <div
                                className='card-content'
                                style={cardContentStyle}
                            >
                                <Link
                                    to={newsUrl}
                                >
                                    <p
                                        className='card-title'
                                        style={cardTitleStyle}
                                    >
                                        {props.title}
                                    </p>
                                </Link>

                                {
                                    props.date &&
                                        <p style={cardDateStyle}>{props.date}</p>
                                }

                                {
                                    !props.owner &&
                                        props.authorName &&
                                            <p
                                                style={authorPStyle}
                                            >
                                                {'Por '}

                                                <Link
                                                    to={authorUrl}
                                                    style={authorLinkStyle}
                                                >
                                                    {props.authorName}
                                                </Link>
                                            </p>
                                }

                                {
                                    props.menu &&
                                        (
                                            !props.posted ?
                                                <div
                                                    className='center'
                                                    style={menuDivStyle}
                                                >
                                                    <Link
                                                        to={
                                                                props.owner ?
                                                                    '/Mis-Notas/Editar-Nota/' + props.id
                                                                :
                                                                    '/Notas-a-Editar/' + props.id
                                                            }
                                                    >
                                                        <Button
                                                            style={buttonStyle}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faEdit}
                                                            />
                                                        </Button>
                                                    </Link>
                                                    {
                                                        props.owner &&
                                                            <Button
                                                                style={buttonStyle}
                                                                onClick={handleDeleteClick}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faTrash}
                                                                />
                                                            </Button>
                                                    }
                                                </div>
                                            :
                                                <h6>
                                                    Esta nota ya fue posteada y no se puede editar.
                                                </h6>
                                        )
                                }
                            </div>
                        </div>
                    :
                        <div
                            className='card'
                            style={opinionCardStyle}
                        >
                            <Link
                                to={newsUrl}
                                style={opinionCardTitleLinkStyle}
                            >
                                <p
                                    className='center card-title'
                                    style={opinionCardTitlePStyle}
                                >
                                    {props.title}
                                </p>
                            </Link>

                            <Link
                                to={authorUrl}
                                style={authorLinkStyle}
                            >
                                <AuthorPhoto
                                    src={props.authorPhoto}
                                    alt={props.authorName}
                                    style={authorPhotoStyle}
                                />
                                
                                {props.authorName}
                            </Link>
                        </div>
                }
            </>
        :
            <Redirect to='/Mis-Notas'/>
    )
}