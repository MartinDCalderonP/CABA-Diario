import React from 'react';
import {Button} from 'react-materialize';

export default (props)=>{
    let buttonStyle={
        backgroundColor: 'var(--colorFondo)',
        color: 'var(--colorLetras)',
        width: '240px',
        fontFamily: 'Crimson Text',
        fontSize: '1rem',
        margin: '10px 10px 0px',
        border: '1px solid var(--transparentDarkBlue)',
        borderRadius: '5px',
        ...props.style
    }

    return(
        <Button
            className='hoverable'
            modal={props.modal}
            waves="green"
            style={buttonStyle}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </Button>
    )
}