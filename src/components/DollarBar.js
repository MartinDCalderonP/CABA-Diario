import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';

export default ()=>{

    const [precios, setPrecios]=useState([]);

    useEffect(
        ()=>{
            let mounted = true;

            fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales').then(
                response=>response.json()
            ).then(
                data=>{
                    mounted &&
                        setPrecios(data);
                }
            )

            return () => mounted = false;
        }, []
    )

    let dollarBarStyle={
        textAlign: 'center',
        marginBottom: '20px',
        borderBottom: '2px solid var(--transparentDarkBlue)',
        boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.14)'
    }

    let pStyle={
        margin: '8px 0px 5px'
    }

    let dividerSpanStyle={
        display: 'block'
    }

    let firstSpanStyle={
        ...dividerSpanStyle,
        marginBottom: '15px'
    }

    let pricesStyle={
        fontWeight: 'bold'
    }

    return(
        <>
            <div
                style={dollarBarStyle}
            >
                {
                    precios[0] &&
                        <p
                            style={pStyle}
                        >
                            <span
                                className='hide-on-med-and-up'
                                style={firstSpanStyle}
                            />

                            {'Dólar BNA: '}
                            
                            <strong
                                style={pricesStyle}
                            >
                                {'$' + precios[0].casa.compra}
                            </strong>
                            
                            {' / '}
                            
                            <strong
                                style={pricesStyle}
                            >
                                {'$' + precios[0].casa.venta + ' '}
                            </strong>

                            {
                                precios[0].casa.variacion>'0' ?
                                    <FontAwesomeIcon
                                        icon={faArrowUp}
                                    />
                                :
                                    <FontAwesomeIcon
                                        icon={faArrowDown}
                                    />
                            }

                            <span
                                className='hide-on-small-only'
                            >
                                {' - '}
                            </span>

                            <span
                                className='hide-on-med-and-up'
                                style={dividerSpanStyle}
                            />

                            {'Dólar Blue: '}
                            
                            <strong
                                style={pricesStyle}
                            >
                                {'$' + precios[1].casa.compra}
                            </strong>
                            
                            {' / '}
                            
                            <strong
                                style={pricesStyle}
                            >
                                {'$' + precios[1].casa.venta + ' '}
                            </strong>

                            {
                                precios[1].casa.variacion>'0' ?
                                    <FontAwesomeIcon
                                        icon={faArrowUp}
                                    />
                                :
                                    <FontAwesomeIcon
                                        icon={faArrowDown}
                                    />
                            }
                        </p>
                }
            </div>

            <style>
                {`
                    .fa-arrow-up>path{
                        color: green;
                    }

                    .fa-arrow-down>path{
                        color: red;
                    }
                `}
            </style>
        </>
    )
}