import React from 'react';
import {Link} from 'react-router-dom';
import AuthorPhoto from './AuthorPhoto';

export default (props)=>{
    let headerStyle={
        margin: '15px 0px 15px',
        borderBottom: '1px solid rgba(0,0,139,0.4)'
    }

    let headerTitleStyle={
        display: 'inline-block',
        fontSize: '1.5rem',
        textTransform: 'uppercase',
        margin: '0px 0px -1px',
        borderBottom: '1px solid var(--colorLetras)',
        paddingBottom: '.3125rem'
    }

    let authorPhotoStyle={
        display: 'inline-block',
        verticalAlign: 'bottom',
        width: '50px',
        height: '50px',
        marginLeft: '5px'
    }

    return(
        <>
            <div
                style={headerStyle}
            >
                <h3
                    style={headerTitleStyle}
                >                
                    {
                        !props.withoutLink ?
                            (
                                props.headerTitle &&
                                    <>
                                        <Link
                                            to={(!props.topic ? '/Secciones/' : '/Temas/') + props.headerTitle}
                                        >
                                            {props.headerTitle}

                                            {
                                                props.authorPhoto &&
                                                    <AuthorPhoto
                                                        src={props.authorPhoto}
                                                        alt={props.headerTitle}
                                                        style={authorPhotoStyle}
                                                    />
                                            }
                                        </Link>
                                    </>
                            )
                        :
                            <>
                                {props.headerTitle}
                            </>
                    }
                </h3>
            </div>
        </>
    )
}