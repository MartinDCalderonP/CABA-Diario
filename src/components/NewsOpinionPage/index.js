import React from 'react'
import styles from './styles.module.css'

const NewsOpinionPage = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner} />
      <p>Cargando noticia...</p>
    </div>
  )
}

export default NewsOpinionPage
