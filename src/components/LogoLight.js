import React from 'react';
import {Link} from 'react-router-dom';
import LogoLight from '../images/logos/logoLight.png';

export default (props)=>{
    let logoStyle={
        width: 'inherit'
    }

    return(
        <Link
            to='/'
            className={'center' + (props.className ? (' ' + props.className) : '')}
            style={props.style}
            onClick={props.onClick}
        >
            <img
                className='switch-logo'
                src={LogoLight}
                alt='CABA Diario Logo'
                style={logoStyle}
            />
        </Link>
    )
}