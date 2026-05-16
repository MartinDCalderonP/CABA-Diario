import React from 'react'
import styles from './styles.module.css'

const NewsList = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner} />
      <p>Cargando noticias...</p>
    </div>
  )
}

export default NewsList
