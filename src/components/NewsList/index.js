import React from 'react'
import styles from './styles.module.css'

function NewsList() {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner} />
      <p>Cargando noticias...</p>
    </div>
  )
}

export default NewsList
