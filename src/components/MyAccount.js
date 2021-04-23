import React from 'react';
import UnderConstruction from '../images/underConstruction.png';

export default ()=>{
    let imgStyle={
        width: '50vh'
    }

    return(
        <div
            className= 'center'
        >
            <img
                src={UnderConstruction}
                alt='Website Under Construction'
                style={imgStyle}
            />
        </div>
    )
}