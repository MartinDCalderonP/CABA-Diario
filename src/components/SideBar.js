import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {NavItem, Icon, Collapsible, CollapsibleItem} from 'react-materialize';
import LogoLight from './LogoLight';
import CloseCross from './CloseCross';
import SearchBox from './SearchBox';
import ThemeSwitch from './ThemeSwitch';

export default (props)=>{
    const [secciones, setSecciones]=useState([]);

    useEffect(
        ()=>{
            fetch('http://localhost:8888/secciones').then(
                response => response.json()
            ).then(
                data =>{
                    setSecciones(data);
                }
            )
        }, []
    )

    let headerStyle={
        marginTop: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }

    let logoStyle={
        width: '220px',
        justifySelf: 'flex-start'
    }

    let searchInputStyle={
        width: '238px',
        margin: '0px 0px 0px 20px',
        border: '1px solid var(--transparentDarkBlue)',
        borderRadius: '2.5px',
        paddingLeft: '20px'
    }

    let collapsibleStyle={
        display: 'block',
        fontSize: '1.5rem',
        color: 'var(--colorLetras)',
        transition: '0.3s',
        marginBottom: '-8px'
    }

    let collapsibleHeaderStyle={
        paddingLeft: '14px'
    }

    let sectionLinkStyle={
        ...collapsibleStyle,
        margin: '0px',
        paddingLeft: '40px'
    }

    let authorsLinkStyle={
        ...collapsibleStyle,
        padding: '8px 8px 8px 30px'
    }

    return(
        <>
            <div
                style={headerStyle}
            >
                <LogoLight
                    style={logoStyle}
                />
                
                <CloseCross
                    className='sidenav-close'
                />
            </div>

            <NavItem
                divider
            />

            <div
                className='hide-on-med-and-up'
            >
                <SearchBox
                    id='side-search-box'
                    style={searchInputStyle}
                    handleSearch={props.handleSearch}
                />

                <NavItem
                    divider
                />
            </div>

            <Link
                className='waves-effect authors-link-hover sidenav-close'
                to='/Autores'
                style={authorsLinkStyle}
            >
                Autores
            </Link>

            <NavItem
                divider
            />

            <Collapsible
                accordion
                style={collapsibleStyle}
            >
                <CollapsibleItem
                    expanded={false}
                    header={
                        <>
                            <a href='#!'
                                style={collapsibleHeaderStyle}
                            >
                                Secciones
                            </a>

                            <Icon>
                                arrow_drop_down
                            </Icon>
                        </>
                    }
                    node='div'
                >
                    {
                        secciones.map(sección=>{
                            return(
                                <Link
                                    className='waves-effect section-link-hover sidenav-close'
                                    key={sección.Sección_ID}
                                    to={'/Sección/' + sección.Sección_Nombre}
                                    style={sectionLinkStyle}
                                >
                                    {sección.Sección_Nombre}
                                </Link>
                            )
                        })
                    }
                </CollapsibleItem>
            </Collapsible>

            <NavItem
                divider
            />

            <ThemeSwitch />

            <style>
                {`
                    #slide-out{
                        background-color: var(--colorFondo);
                        height: 100%;
                    }

                    .collapsible-body{
                        background-color: var(--colorFondo) !important;
                    }
                    
                    .section-link-hover:hover{
                        padding-left: 50px !important;
                        color: blue !important;
                    }

                    .authors-link-hover:hover{
                        padding-left: 40px !important;
                        color: blue !important;
                    }
                `}
            </style>
        </>
    )
}