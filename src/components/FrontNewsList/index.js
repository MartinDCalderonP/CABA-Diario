import React from 'react'
import styles from './styles.module.css'

export default () => {
  return (
    <div className={styles.preloader}>
      <div className={styles.spinner} />
      <p>Cargando...</p>
    </div>
  )
}
