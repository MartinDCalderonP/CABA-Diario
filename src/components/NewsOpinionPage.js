import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Row, Col, Preloader} from 'react-materialize';
// Chip ^
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import AuthorPhoto from './AuthorPhoto';
// import SocialIcons from './SocialIcons';
// import NewsRow from './NewsRow';
// import NewsOpinionCard from './NewsOpinionCard';

export default (props)=>{
    require('moment/locale/es.js');

    let {id}=useParams();

    let [nota, setNota]=useState(null);
    let [contador, setContador]=useState();
    let [aumentar, setAumentar]=useState(false);

    const toLink=(word)=>{
        if (word) {
            let space = / /g;
            let undesirable = /\.|\$|,|"|:/g;

            return word.replace(space, '-').replace(undesirable, '');
        } else {
            return 'not-title';
        }
    }

    let authorUrl='';

    useEffect(
        ()=>{
            let mounted = true;

            fetch(`https://caba-diario-backend.herokuapp.com/notas/posteadas/` + id).then(
                response=>response.json()
            ).then(
                data=>{
                    mounted &&
                        setNota(data);
                        setContador(data.Nota_Contador+1);
                }
            )

            return () => mounted = false;
        }, [id]
    )

    useEffect(
        () => {
            const timer = setTimeout(() => setAumentar(true), 10000);
            return () => clearTimeout(timer);
    }, []);

    if (aumentar) {
        const formData=new FormData();

        formData.append('Contador', contador);

        fetch(`https://caba-diario-backend.herokuapp.com/notas/contador/` + id, {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        })
    }

    if (nota) {
        authorUrl=`/Autor/${toLink(nota.Autor_Nombre)}-${nota.Autor_ID}`
    }

    let sectionDateStyle={
        borderBottom: '2px solid var(--transparentDarkBlue)',
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between'
    }

    let sectionTextStyle={
        marginBottom: '0px',
        fontSize: '1.25rem'
    }

    let dateTextStyle={
        marginBottom: '0px',
        fontSize: '1rem',
        lineHeight: '1.6'
    }

    let newsTitleStyle={
        fontSize: '3rem',
        margin: '10px 0px 5px'
    }

    let porStyle={
        fontSize: '1rem',
        margin: '0px 0px 5px'
    }

    let authorStyle={
        color: 'var(--colorLetras)',
        fontWeight: 'bold'
    }

    let authorDivStyle={
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    }

    let authorPhotoStyle={
        margin: '20px 20px 20px 0px'
    }

    let colStyle={
        marginTop: '10px',
        paddingRight: '20px'
    }

    let imgStyle={
        width: '100%'
    }

    let imgFooterStyle={
        fontSize: '0.9rem',
        margin: '-15px 15px 0px',
        border: '1px solid var(--transparentDarkBlue)',
        padding: '15px 15px 5px'
    }

    let imgCreditStyle={
        color: '#9e9e9e'
    }

    let textBodyStyle={
        textAlign: 'justify',
        fontSize: '1.35rem'
    }

    // let shareDivStyle={
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     alignItems: 'center',
    //     marginBottom: '10px',
    //     borderTop: '1px solid var(--transparentDarkBlue)',
    //     borderBottom: '1px solid var(--transparentDarkBlue)'
    // }

    // let shareTextStyle={
    //     fontSize: '1.25rem'
    // }

    // let socialIconsStyle={
    //     margin: '0px'
    // }

    // let topicsDivStyle={
    //     marginBottom: '10px',
    //     borderBottom: '1px solid var(--transparentDarkBlue)',
    //     paddingBottom: '5px'
    // }

    // let relatedColStyle={
    //     borderLeft: '1px solid var(--transparentDarkBlue)',
    //     paddingLeft: '20px'
    // }

    let preloaderDivStyle={
        marginTop: '20px',
        textAlign: 'center'
    }
    
    return(
        <>
            <div
                className='container'
            >
                {
                    nota ?
                        <Row>
                            <div
                                style={sectionDateStyle}
                            >
                                <p
                                    style={sectionTextStyle}
                                >
                                    <Link
                                        to={'/Sección/' + nota.Sección_Nombre}
                                    >
                                        {nota.Sección_Nombre}
                                    </Link>
                                </p>
                                <p
                                    style={dateTextStyle}
                                >
                                    {moment(nota.Nota_Fecha).format('LLL')}
                                </p>
                            </div>

                            <h2
                                style={newsTitleStyle}
                            >
                                {nota.Nota_Título}
                            </h2>

                            {
                                !nota.Nota_Opinión ?
                                    nota.Autor_Nombre &&
                                        <p
                                            style={porStyle}
                                        >
                                            {'Por '}
                                            <Link
                                                to={authorUrl}
                                                style={authorStyle}
                                            >
                                                {nota.Autor_Nombre}
                                            </Link>
                                        </p>
                                :
                                    <div
                                        style={authorDivStyle}
                                    >
                                        <Link
                                            to={authorUrl}
                                            style={authorStyle}
                                        >
                                            <AuthorPhoto
                                                src={nota.Autor_Foto}
                                                alt={nota.Autor_Nombre}
                                                style={authorPhotoStyle}
                                            />
                                        </Link>
                                        
                                        <Link
                                            to={authorUrl}
                                            style={authorStyle}
                                        >
                                            {nota.Autor_Nombre}
                                        </Link>
                                    </div>
                            }
                            
                            <Col
                                s={12}
                                m={9}
                                style={colStyle}
                            >
                                {
                                    !nota.Nota_Opinión &&
                                        <>
                                            <img
                                                src={nota.Nota_Imagen}
                                                alt={nota.Nota_PieDeImagen}
                                                style={imgStyle}
                                            />
                                            
                                            {
                                                (nota.Nota_PieDeImagen || nota.Nota_CréditoDeImagen) &&
                                                    <p
                                                        style={imgFooterStyle}
                                                    >
                                                        {nota.Nota_PieDeImagen}

                                                        {
                                                            nota.Nota_CréditoDeImagen &&
                                                                <span
                                                                    style={imgCreditStyle}
                                                                >
                                                                    {' Crédito: ' + nota.Nota_CréditoDeImagen}
                                                                </span>
                                                        }
                                                    </p>
                                            }
                                        </>
                                }

                                <div
                                    className='text-body'
                                    style={textBodyStyle}
                                >
                                    {ReactHtmlParser(nota.Nota_Texto)}
                                </div>

                                {/* <div
                                    style={shareDivStyle}
                                >
                                    <p
                                        style={shareTextStyle}
                                    >
                                        Compartir:
                                    </p>

                                    <SocialIcons
                                        style={socialIconsStyle}
                                        facebook='Share'
                                        twitter='Share'
                                        whatsApp='Share'
                                        linkedIn='Share'
                                    />
                                </div>

                                <div style={topicsDivStyle}>
                                    <Chip close={false} options={null}>Tema 1</Chip>
                                    <Chip close={false} options={null}>Tema 2</Chip>
                                    <Chip close={false} options={null}>Tema 3</Chip>
                                    <Chip close={false} options={null}>Tema 4</Chip>
                                    <Chip close={false} options={null}>Tema 5</Chip>
                                </div> */}
                            </Col>

                            {/* <Col
                                s={12}
                                m={3}
                                style={relatedColStyle}
                            >
                                <NewsRow
                                    headerTitle='Relacionadas'
                                    withoutLink
                                >
                                    <NewsOpinionCard />
                                    <NewsOpinionCard />
                                    <NewsOpinionCard />
                                </NewsRow>
                            </Col> */}
                        </Row>
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
                </div>

                <style>
                    {`
                        .text-body>p:first-child::first-letter{
                            float: left;
                            color: blue;
                            font-size: 400%;
                        }

                        .text-body>p>a{
                            transition: .2s ease;
                            color: blue;
                        }

                        .text-body>p>a:hover{
                            color: var(--hoverBlue);
                        }

                        .text-body>p>a:visited{
                            color: violet;
                        }

                        .text-body>p>strong{
                            font-weight: 600;
                        }

                        .text-body>.destacado{
                            font-family: suecaslabmedium,Georgia,"serif";
                            margin: 30px auto 60px;
                            padding-left: 25px;
                            font-size: 22px;
                            line-height: 32px;
                            border-left: 7px solid #000;
                            letter-spacing: -.2px;
                        }

                        .text-body>h4{
                            margin-bottom: 2rem;
                        }

                        .text-body>ul>li{
                            margin-bottom: 2rem;
                        }

                        .text-body>ul>li::before{
                            content: "";
                            background-color: #000;
                            min-width: 8px;
                            height: 30px;
                            margin-right: 20px;
                            margin-left: -25px;
                            display: inline-block;
                            position: absolute;
                        }

                        .chip{
                            background-color: var(--colorFondo);
                            color: var(--colorLetras);
                            border: 1px solid var(--transparentDarkBlue);
                            box-shadow: 0px 1px 1px 0.1px black;
                        }
                    `}
                </style>
            </>
    )
}