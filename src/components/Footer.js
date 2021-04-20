import React from 'react';
import LogoLight from './LogoLight';
import SocialIcons from './SocialIcons';

export default ()=>{
    let footerStyle={
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
        borderTop: '2px solid var(--transparentDarkBlue)',
        padding: '20px',
        boxShadow: '0px -2px 2px 0px rgba(0, 0, 0, 0.12), 0px -2px 2px -2px rgba(0, 0, 0, 0.2), 0px -5px 5px 0px rgba(0,0,0,0.2)'
    }

    let pStyle={
        margin: '5px'
    }

    return(
        <div
            style={footerStyle}
        >
            <LogoLight />

            <SocialIcons
                facebook='CABADiario'
                twitter='@CABADiario'
                instagram='CABADiario'
                youTube='CABADiario'
                whatsApp='CABADiario'
                linkedIn='CABADiario'
            />

            <p
                style={pStyle}
            >
                © CABA Diario 2020 - Todos los derechos reservados
            </p>
        </div>
    )
}