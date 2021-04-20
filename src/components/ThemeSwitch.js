import React from 'react';
import {NavItem, Switch} from 'react-materialize';
import FaviconLight from '../images/favicons/faviconLight.png';
import FaviconDark from '../images/favicons/faviconDark.png';
import LogoLight from '../images/logos/logoLight.png';
import LogoDark from '../images/logos/logoDark.png';

export default ()=>{
    document.addEventListener("DOMContentLoaded", function(event) { 
        let currentTheme=localStorage.getItem('theme');

        let themeSwitch=document.getElementById('theme-switch');

        if(currentTheme==='dark'){
            themeSwitch.checked='true';

            switchTheme();
        }else{
            document.getElementById('favicon').setAttribute('href', FaviconLight);
        }
    });

    function switchTheme(){
        let dataTheme=document.documentElement.getAttribute('data-theme');

        let switchLogos=document.getElementsByClassName('switch-logo');

        let wavesEffects=document.getElementsByClassName('waves-effect');

        if(dataTheme==='dark'){
            document.documentElement.removeAttribute('data-theme');

            localStorage.setItem('theme', 'light');

            document.getElementById('favicon').setAttribute('href', FaviconLight);

            for (let switchLogo of switchLogos){
                switchLogo.setAttribute('src', LogoLight);
            };

            for (let wavesEffect of wavesEffects){
                wavesEffect.classList.remove('waves-light');
            };
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');

            localStorage.setItem('theme', 'dark');

            document.getElementById('favicon').setAttribute('href', FaviconDark);

            for (let switchLogo of switchLogos){
                switchLogo.setAttribute('src', LogoDark);
            };

            for (let wavesEffect of wavesEffects){
                wavesEffect.classList.add('waves-light');
            };
        }
    }

    let itemStyle={
        padding: '8px 8px 8px 30px',
        display: 'flex',
        alignItems: 'center'
    }

    let spanStyle={
        fontSize: '1.5rem',
        color: 'var(--colorLetras)'
    }

    return(
        <>
            <div
                id='theme-switch-div'
            >
                <label
                    htmlFor='theme-switch'
                >
                    <NavItem
                        className='waves-effect'
                        style={itemStyle}
                    >
                        <span
                            style={spanStyle}
                        >
                            Modo Oscuro:
                        </span>
                        
                        <Switch
                            id='theme-switch'
                            offLabel=''
                            onChange={()=> switchTheme()}
                            onLabel=''
                        />
                    </NavItem>
                </label>
            </div>

            <style>
                {`
                    #theme-switch-div:hover{
                        background-color: rgba(0,0,0,0.05);
                    }
                `}
            </style>
        </>
    )
}