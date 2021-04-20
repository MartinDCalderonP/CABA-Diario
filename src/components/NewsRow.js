import React from 'react';
import {Row} from 'react-materialize';
import RowHeader from './RowHeader';

export default (props)=>{
    let newsRowStyle={
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '0px'
    }

    return(
        <>
            {
                props.headerTitle &&
                    (
                        !props.authorPhoto ?
                            <RowHeader
                                headerTitle={props.headerTitle}
                                topic={props.topic}
                                withoutLink={props.withoutLink}
                            />
                        :
                            <RowHeader
                                headerTitle={props.headerTitle}
                                authorPhoto={props.authorPhoto}
                            />
                    )
            }

            <Row
                className={props.mostRead && 'most-read'}
                style={newsRowStyle}
            >
                {props.children}
            </Row>
        </>
    )
}