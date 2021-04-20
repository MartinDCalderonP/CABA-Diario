import React, {useState} from 'react';
import {Navbar, Icon} from 'react-materialize';
import SideBar from './SideBar';
import SearchBox from './SearchBox';
import LogoLight from './LogoLight';
import LoginModal from './LoginModal';
import LoggedInDropdown from './LoggedInDropdown';

export default (props)=>{
    const [showSB, setShowSB] = useState(false);

    const showSearchBox=()=>{
        if (showSB===false) {
            setShowSB(true);
        } else {
            setShowSB(false);
            props.handleSearch(null);
        }
    };

    const handleLogoClick=()=>{
        setShowSB(false);

        props.handleSearch(null);
    }

    let navbarStyle={
        backgroundColor: 'var(--colorFondo)',
        height: '65px',
        borderBottom: '2px solid var(--transparentDarkBlue)'
    }

    let searchDivStyle={
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    }

    let searchInputHideStyle={
        height: '2.5rem',
        width: '0px',
        margin: '0px 0px 0px 5px',
        border: '0px none',
        borderRadius: '2.5px',
        paddingLeft: '0px',
        transition: '0.3s'
    }

    let searchInputShowStyle={
        ...searchInputHideStyle,
        width: '10rem',
        border: '1px solid var(--transparentDarkBlue)',
        paddingLeft: '20px',
    }

    return(
        <>
            <Navbar
                id='slide-out'
                alignLinks='right'
                fixed
                menuIcon={<></>}
                brand={
                    <>
                        <a
                            data-target='slide-out'
                            className='show-on-medium-and-up sidenav-trigger left'
                            href='#!'
                        >
                            <Icon
                                className='i-hover'
                            >
                                menu
                            </Icon>
                        </a>

                        <div
                            className='hide-on-small-only left'
                            style={searchDivStyle}
                        >
                            <a
                                href='#!'
                                onClick={showSearchBox}
                            >
                                <Icon
                                    className='i-hover'
                                >
                                    search
                                </Icon>
                            </a>

                            <SearchBox
                                id='nav-search-box'
                                style={
                                    !showSB ?
                                        searchInputHideStyle
                                    :
                                        searchInputShowStyle
                                }
                                handleSearch={props.handleSearch}
                            />
                        </div>

                        <LogoLight
                            className='brand-logo'
                            onClick={handleLogoClick}
                        />
                        
                        {
                            !props.user ?
                                <LoginModal
                                    handleLoginSuccess={props.handleLoginSuccess}
                                />
                            :
                                <LoggedInDropdown
                                    user={props.user}
                                    handleLogout={props.handleLogout}
                                />
                        }
                    </>
                }
                options={{
                    draggable: true,
                    edge: 'left',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 200,
                    preventScrolling: true
                }}
                sidenav={
                    <SideBar
                        handleSearch={props.handleSearch}
                    />
                }
                style={navbarStyle}
            />

            <style>
                {`
                    .brand-logo{
                        height: 60px;
                    }
                `}
            </style>
        </>
    )
}