import React, {useState, useEffect} from 'react';
import {Preloader} from 'react-materialize';
import DollarBar from './DollarBar';
import MainAsideNews from './MainAsideNews';
import NewsRow from './NewsRow';
import NewsOpinionCard from './NewsOpinionCard';

export default ()=>{
    const [principales, setPrincipales]=useState([]);
    const [primerTema, setPrimerTema]=useState([]);
    const [primeraSección, setPrimeraSección]=useState([]);
    const [segundoTema, setSegundoTema]=useState([]);
    const [másLeídas, setMásLeídas]=useState([]);

    useEffect(
        ()=>{
            let mounted = true;

            fetch(`https://caba-diario-backend.herokuapp.com/notas/principales`).then(
                response=>response.json()
            ).then(
                data=>{
                    mounted &&
                        setPrincipales(data);
                }
            )

            fetch(`https://caba-diario-backend.herokuapp.com/notas/primerTema`).then(
                response=>response.json()
            ).then(
                data=>{
                    mounted &&
                        setPrimerTema(data);
                }
            )

            fetch(`https://caba-diario-backend.herokuapp.com/notas/primeraSeccion`).then(
                response=>response.json()
            ).then(
                data=>{
                    mounted &&
                        setPrimeraSección(data);
                }
            )

            fetch(`https://caba-diario-backend.herokuapp.com/notas/segundoTema`).then(
                response=>response.json()
            ).then(
                data=>{
                    mounted &&
                        setSegundoTema(data);
                }
            )

            fetch(`https://caba-diario-backend.herokuapp.com/notas/masLeidas`).then(
                response=>response.json()
            ).then(
                data=>{
                    mounted &&
                        setMásLeídas(data);
                }
            )

            return () => mounted = false;
        }, []
    );

    let number=0;

    let dividerStyle={
        margin: '25px 0px 20px'
    }

    let preloaderDivStyle={
        textAlign: 'center',
        marginTop: '20px'
    }

    return(
        <>
            <DollarBar />

            <div
                className='container'
            >
                {
                    principales.length>=1 ?
                        <>
                            <MainAsideNews
                                main={
                                    principales[0] &&
                                        <NewsOpinionCard
                                            id={principales[0].Nota_ID}
                                            title={principales[0].Nota_Título}
                                            authorId={principales[0].Autor_ID}
                                            authorName={principales[0].Autor_Nombre}
                                            authorPhoto={principales[0].Autor_Foto}
                                            section={principales[0].Sección_Nombre}
                                            img={principales[0].Nota_Imagen}
                                            opinion={principales[0].Nota_Opinión}
                                        />
                                }

                                asideUp={
                                    principales[1] &&
                                        <NewsOpinionCard
                                            id={principales[1].Nota_ID}
                                            title={principales[1].Nota_Título}
                                            authorId={principales[1].Autor_ID}
                                            authorName={principales[1].Autor_Nombre}
                                            authorPhoto={principales[1].Autor_Foto}
                                            section={principales[1].Sección_Nombre}
                                            img={principales[1].Nota_Imagen}
                                            opinion={principales[1].Nota_Opinión}
                                        />
                                }

                                asideDown={
                                    principales[2] &&
                                        <NewsOpinionCard
                                            id={principales[2].Nota_ID}
                                            title={principales[2].Nota_Título}
                                            authorId={principales[2].Autor_ID}
                                            authorName={principales[2].Autor_Nombre}
                                            authorPhoto={principales[2].Autor_Foto}
                                            section={principales[2].Sección_Nombre}
                                            img={principales[2].Nota_Imagen}
                                            opinion={principales[2].Nota_Opinión}
                                        />
                                }
                            />

                            <div
                                className="divider"
                                style={dividerStyle}
                            />

                            <NewsRow>
                                {
                                    principales[3] &&
                                        <NewsOpinionCard
                                            id={principales[3].Nota_ID}
                                            title={principales[3].Nota_Título}
                                            authorId={principales[3].Autor_ID}
                                            authorName={principales[3].Autor_Nombre}
                                            authorPhoto={principales[3].Autor_Foto}
                                            section={principales[3].Sección_Nombre}
                                            img={principales[3].Nota_Imagen}
                                            opinion={principales[3].Nota_Opinión}
                                        />
                                }

                                {
                                    principales[4] &&
                                        <NewsOpinionCard
                                            id={principales[4].Nota_ID}
                                            title={principales[4].Nota_Título}
                                            authorId={principales[4].Autor_ID}
                                            authorName={principales[4].Autor_Nombre}
                                            authorPhoto={principales[4].Autor_Foto}
                                            section={principales[4].Sección_Nombre}
                                            img={principales[4].Nota_Imagen}
                                            opinion={principales[4].Nota_Opinión}
                                        />
                                }

                                {
                                    principales[5] &&
                                        <NewsOpinionCard
                                            id={principales[5].Nota_ID}
                                            title={principales[5].Nota_Título}
                                            authorId={principales[5].Autor_ID}
                                            authorName={principales[5].Autor_Nombre}
                                            authorPhoto={principales[5].Autor_Foto}
                                            section={principales[5].Sección_Nombre}
                                            img={principales[5].Nota_Imagen}
                                            opinion={principales[5].Nota_Opinión}
                                        />
                                }
                            </NewsRow>

                            <NewsRow
                                headerTitle='Coronavirus'
                                topic
                            >
                                {
                                    primerTema.map(notaPrimerTema=>{
                                        return(
                                            <NewsOpinionCard
                                                key={notaPrimerTema.Nota_ID}
                                                id={notaPrimerTema.Nota_ID}
                                                title={notaPrimerTema.Nota_Título}
                                                authorId={notaPrimerTema.Autor_ID}
                                                authorName={notaPrimerTema.Autor_Nombre}
                                                authorPhoto={notaPrimerTema.Autor_Foto}
                                                section={notaPrimerTema.Sección_Nombre}
                                                img={notaPrimerTema.Nota_Imagen}
                                                opinion={notaPrimerTema.Nota_Opinión}
                                            />
                                        )
                                    })
                                }
                            </NewsRow>

                            <NewsRow
                                headerTitle='Internacionales'
                            >
                                {
                                    primeraSección.map(notaPrimeraSección=>{
                                        return(
                                            <NewsOpinionCard
                                                key={notaPrimeraSección.Nota_ID}
                                                id={notaPrimeraSección.Nota_ID}
                                                title={notaPrimeraSección.Nota_Título}
                                                authorId={notaPrimeraSección.Autor_ID}
                                                authorName={notaPrimeraSección.Autor_Nombre}
                                                authorPhoto={notaPrimeraSección.Autor_Foto}
                                                section={notaPrimeraSección.Sección_Nombre}
                                                img={notaPrimeraSección.Nota_Imagen}
                                                opinion={notaPrimeraSección.Nota_Opinión}
                                            />
                                        )
                                    })
                                }
                            </NewsRow>

                            <MainAsideNews
                                headerTitle='Deuda'
                                topic
                                main={
                                    segundoTema[0] &&
                                        <NewsOpinionCard
                                            id={segundoTema[0].Nota_ID}
                                            title={segundoTema[0].Nota_Título}
                                            authorId={segundoTema[0].Autor_ID}
                                            authorName={segundoTema[0].Autor_Nombre}
                                            authorPhoto={segundoTema[0].Autor_Foto}
                                            section={segundoTema[0].Sección_Nombre}
                                            img={segundoTema[0].Nota_Imagen}
                                            opinion={segundoTema[0].Nota_Opinión}
                                        />
                                }

                                asideUp={
                                    segundoTema[1] &&
                                        <NewsOpinionCard
                                            id={segundoTema[1].Nota_ID}
                                            title={segundoTema[1].Nota_Título}
                                            authorId={segundoTema[1].Autor_ID}
                                            authorName={segundoTema[1].Autor_Nombre}
                                            authorPhoto={segundoTema[1].Autor_Foto}
                                            section={segundoTema[1].Sección_Nombre}
                                            img={segundoTema[1].Nota_Imagen}
                                            opinion={segundoTema[1].Nota_Opinión}
                                        />
                                }
                                
                                asideDown={
                                    segundoTema[2] &&
                                        <NewsOpinionCard
                                            id={segundoTema[2].Nota_ID}
                                            title={segundoTema[2].Nota_Título}
                                            authorId={segundoTema[2].Autor_ID}
                                            authorName={segundoTema[2].Autor_Nombre}
                                            authorPhoto={segundoTema[2].Autor_Foto}
                                            section={segundoTema[2].Sección_Nombre}
                                            img={segundoTema[2].Nota_Imagen}
                                            opinion={segundoTema[2].Nota_Opinión}
                                        />
                                }
                            />

                            <NewsRow
                                headerTitle='Más Leídas'
                                mostRead
                                withoutLink
                            >
                                {
                                    másLeídas.map(másLeída=>{
                                        number=number+1
                                        return(
                                            <NewsOpinionCard
                                                key={másLeída.Nota_ID}
                                                id={másLeída.Nota_ID}
                                                title={másLeída.Nota_Título}
                                                authorId={másLeída.Autor_ID}
                                                authorName={másLeída.Autor_Nombre}
                                                authorPhoto={másLeída.Autor_Foto}
                                                section={másLeída.Sección_Nombre}
                                                img={másLeída.Nota_Imagen}
                                                opinion={másLeída.Nota_Opinión}
                                                number={number}
                                            />
                                        )
                                    })
                                }
                            </NewsRow>
                        </>
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
                    @media only screen and (max-width: 600px) {
                        .container>.divider, .col>.divider{
                            display: none;
                        }
                    }
                `}
            </style>
        </>
    )
}