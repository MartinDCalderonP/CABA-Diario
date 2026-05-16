/* eslint-disable react/prop-types */
import React from 'react'
import DefaultPhoto from '../../images/defaultPhoto.png'
import styles from './styles.module.css'

const AuthorPhoto = (props) => {
  return (
    <img
      src={props.src || DefaultPhoto}
      alt={props.alt || 'Foto de Perfil'}
      className={styles.autorPhoto}
      style={props.style}
    />
  )
}

export default AuthorPhoto
