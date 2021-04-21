import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Preloader} from 'react-materialize';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import FrontNewsList from './FrontNewsList';
import AuthorPhoto from './AuthorPhoto';
import SocialIcons from './SocialIcons';
import NewsRow from './NewsRow';
import NewsOpinionCard from './NewsOpinionCard';
import ThisButton from './ThisButton';

export default (props)=>{
    require('moment/locale/es.js');

    let {id} = useParams();

    let replacedId = '';

    let {title} = useParams();

    let endpoint = '';

    if (props.búsqueda) {
        endpoint = '/busqueda/' + props.búsqueda

        title = `Resultados de "${props.búsqueda}".`
    } else {
        switch (props.type) {
            case 'Autor':
                let undesirable = /-|[a-zA-ZÀ-ÿ\u00f1\u00d1]/g;

                replacedId = id.replace(undesirable, '');

                endpoint = '/autor/posteadas/' + replacedId
                break;

            case 'Sección':
                endpoint = '/seccion/posteadas/' + title
                break;

            case 'Tema':
                endpoint = '/tema/posteadas/' + title
                break;

            case 'Mis Notas':
                endpoint = '/autor/' + props.user.id
                break;

            case 'Notas a Editar':
                endpoint = '/editor/' + props.user.id
                break;

            default:
                break;
        }
    }

    const [notas, setNotas]=useState([]);

    let baseURL='https://caba-diario-backend.herokuapp.com';

    let url = `${baseURL}/notas/${endpoint}`;

    useEffect(
        ()=>{
            setNotas([]);

            if (url !== `${baseURL}/notas/`) {
                fetch(url).then(
                    response=>response.json()
                ).then(
                    data=>{
                        setNotas(data);
                    }
                )
            }
        }, [url]
    )

    let bioDivStyle={
        textAlign: 'center',
        margin: '15px 0px 25px',
        border: '1px solid var(--transparentDarkBlue)',
        borderRadius: '2px',
        padding: '0px 30px 20px 10px'
    }

    let authorNameStyle={
        margin: '10px auto'
    }
    
    let bioInnerDivStyle={
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px 0px 0px',
        fontSize: '1.2rem',
        textAlign: 'justify',
    }

    let authorPhotoStyle={
        margin: '0px 10px',
        minWidth: '8rem',
        minHeight: '8rem'
    }

    let thisButtonStyle={
        margin: '0px 0px 20px'
    }

    let preloaderDivStyle={
        textAlign: 'center',
        marginTop: '20px'
    }

    return(
        endpoint !== '' ?
            <>
                <div
                    className='container'
                >
                    {
                        props.type==='Autor' ?
                            notas[0] &&
                                <div
                                    className="z-depth-2 hoverable"
                                    style={bioDivStyle}
                                >
                                    <h3
                                        style={authorNameStyle}
                                    >
                                        {notas[0].Autor_Nombre}
                                    </h3>
                    
                                    <SocialIcons
                                        facebook={notas[0].Autor_Facebook}
                                        twitter={notas[0].Autor_Twitter}
                                        instagram={notas[0].Autor_Instagram}
                                        youTube={notas[0].Autor_YouTube}
                                    />
                                    
                                    <div
                                        style={bioInnerDivStyle}
                                    >
                                        <AuthorPhoto
                                            src={notas[0].Autor_Foto}
                                            alt={notas[0].Autor_Nombre}
                                            style={authorPhotoStyle}
                                        />

                                        {ReactHtmlParser(notas[0].Autor_Descripción)}
                                    </div>
                                </div>
                        :
                            <div
                                className='center-align'
                            >
                                <h3>
                                    {
                                        props.user ?
                                            props.type
                                        :
                                            title
                                    }
                                </h3>

                                {
                                    props.type==='Mis Notas' &&
                                        <Link to='/Mis-Notas/Nueva-Nota'>
                                            <ThisButton
                                                style={thisButtonStyle}
                                            >
                                                Nueva Nota
                                            </ThisButton>
                                        </Link>
                                }
                            </div>
                    }
                
                    <NewsRow>
                        {
                            notas.length>=1 ?
                                notas.map(nota=>{
                                    return(
                                        <NewsOpinionCard
                                            key={nota.Nota_ID}
                                            id={nota.Nota_ID}
                                            title={nota.Nota_Título}
                                            authorId={nota.Autor_ID}
                                            authorName={nota.Autor_Nombre}
                                            authorPhoto={nota.Autor_Foto}
                                            section={nota.Sección_Nombre}
                                            img={nota.Nota_Imagen}
                                            opinion={nota.Nota_Opinión}
                                            date={moment(nota.Nota_Fecha).format('LL')}
                                            posted={nota.Nota_Posteada}
                                            owner={props.type==='Mis Notas'}
                                            menu={props.user}
                                        />
                                    )
                                })
                            :
                                <div
                                    style={preloaderDivStyle}
                                >
                                    <Preloader
                                        active
                                        color="blue"
                                        flashing={false}
                                        size="big"
                                    />
                                </div>
                        }
                    </NewsRow>
                </div>

                {
                    props.user &&
                        <style>
                            {`
                                .blocked{
                                    opacity: 0.5;
                                }
                            `}
                        </style>
                }
            </>
        :
            <FrontNewsList />
    )
}