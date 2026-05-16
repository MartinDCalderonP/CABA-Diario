import React from 'react'
import styles from './styles.module.css'

const FrontNewsList = () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner} />
      <p>Cargando...</p>
    </div>
  )
}

export default FrontNewsList
