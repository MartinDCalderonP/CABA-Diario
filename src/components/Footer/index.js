/* eslint-disable react/function-component-definition, react/prop-types */
import React from 'react'
import LogoLight from '../LogoLight/index'
import SocialIcons from '../SocialIcons/index'
import styles from './styles.module.css'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <LogoLight />

      <SocialIcons
        facebook='CABADiario'
        twitter='@CABADiario'
        instagram='CABADiario'
        youTube='CABADiario'
        whatsApp='CABADiario'
        linkedIn='CABADiario'
      />

      <p className={styles.copyright}>
        © CABA Diario 2020 - Todos los derechos reservados
      </p>
    </div>
  )
}

export default Footer
