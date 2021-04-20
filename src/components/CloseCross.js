import React from 'react';
import {Icon} from 'react-materialize';

export default (props)=>{
    let aStyle={
        margin: '15px'
    }

    return(
        <a
            className={'right' + (props.className ? (' ' + props.className) : '')}
            href='#!'
            style={aStyle}
        >
            <Icon
                className='i-hover'
            >
                close
            </Icon>
        </a>
    )
}