import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Row, Preloader} from 'react-materialize';
import AuthorPhoto from './AuthorPhoto';

export default (props)=>{
    const [autores, setAutores]=useState([]);

    let baseURL='https://caba-diario-backend.herokuapp.com';

    useEffect(
        ()=>{
            fetch(`${baseURL}/autores`).then(
                response => response.json()
            ).then(
                data =>{
                    setAutores(data);
                }
            )
        }, []
    )

    const toLink=(word)=>{
        if (word) {
            let space = / /g;
            let undesirable = /\.|\$|,|"|:/g;

            return word.replace(space, '-').replace(undesirable, '');
        } else {
            return 'not-title';
        }
    }

    let rowStyle={
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }

    let authorDivStyle={
        background: 'var(--colorFondo)',
        margin: '0px 10px 10px',
        border: '1px solid var(--transparentDarkBlue)',
        borderRadius: '0px',
        padding: '0px 0px 10px'
    }

    let authorLinkStyle={
        color: 'var(--colorLetras)',
        fontWeight: 'bold'
    }

    let authorPhotoStyle={
        margin: '0 auto'
    }

    return(
        <div
            className='container center-align'
        >
            <h3>
                Autores
            </h3>
            
            <Row
                style={rowStyle}
            >
                {
                    autores.length>=1 ?
                        autores.map(autor=>{
                            return(
                                <div
                                    className='card center-align hoverable'
                                    key={autor.Autor_ID}
                                    style={authorDivStyle}
                                >
                                    <Link
                                        to={`/Autor/${toLink(autor.Autor_Nombre)}-${autor.Autor_ID}`}
                                        style={authorLinkStyle}                                 
                                    >
                                        <h5>{autor.Autor_Nombre}</h5>

                                        <AuthorPhoto
                                            src={autor.Autor_Foto}
                                            alt={autor.Autor_Nombre}
                                            style={authorPhotoStyle}
                                        />
                                    </Link>
                                </div>
                            )
                        })
                    :
                        <Preloader
                            active
                            color="blue"
                            flashing={false}
                            size="big"
                        />
                }
            </Row>
        </div>
    )
}