import React from 'react';
import DefaultPhoto from '../images/defaultPhoto.png';

export default (props)=>{
    let autorPhotoStyle={
        display: 'block',
        margin: '0px',
        width: '6rem',
        height: '6rem',
        border: '1px solid var(--transparentDarkBlue)',
        borderRadius: '50%',
        ...props.style
    }
    
    return(
        <img
            src={props.src || DefaultPhoto}
            alt={props.alt || 'Foto de Perfil'}
            style={autorPhotoStyle}
        />
    )
}