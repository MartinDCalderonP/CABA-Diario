/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../images/logos/logoLight.png'

const LogoLight = (props) => {
  return (
    <Link
      to='/'
      className={props.className || ''}
      style={props.style}
      onClick={props.onClick}
    >
      <img
        className='switch-logo'
        src={Logo}
        alt='CABA Diario Logo'
        style={{ width: 'inherit' }}
      />
    </Link>
  )
}

export default LogoLight
