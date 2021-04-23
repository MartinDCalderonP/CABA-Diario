import React from 'react';
import UnderConstruction from '../images/underConstruction.png';

export default ()=>{
    let imgStyle={
        width: '50 vh'
    }

    return(
        <>
            <img
                className='center'
                src={UnderConstruction}
                alt='Website Under Construction'
                style={imgStyle}
            />
        </>
    )
}