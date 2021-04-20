import React from 'react';
import {Row, Col} from 'react-materialize';
import RowHeader from './RowHeader';

export default (props)=>{
    let rowStyle={
        margin: '0px'
    }

    let mainColStyle={
        paddingRight: '10px'
    }

    let asideColStyle={
        borderLeft: '1px solid var(--transparentDarkBlue)',
        paddingLeft: '10px'
    }

    let dividerStyle={
        marginBottom: '20px'
    }

    return(
        <>
            {
                props.headerTitle &&
                    <RowHeader
                        headerTitle={props.headerTitle}
                        topic={props.topic}
                    />
            }

            <Row
                className='main-aside'
                style={rowStyle}
            >
                <Col
                    s={12}
                    m={8}
                    className='main-col'
                    style={mainColStyle}
                >
                    {props.main}
                </Col>

                <Col
                    s={12}
                    m={4}
                    style={asideColStyle}
                >
                    {props.asideUp}

                    <div
                        className="divider"
                        style={dividerStyle}
                    />

                    {props.asideDown}
                </Col>
            </Row>
        </>
    )
}