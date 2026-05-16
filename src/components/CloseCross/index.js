import React from 'react'
import styles from './styles.module.css'

const CloseCross = (props) => {
  return (
    <a
      className={`${styles.closeLink} ${props.className || ''}`}
      href='#!'
      onClick={props.onClick}
    >
      <span className={styles.closeIcon}>✕</span>
    </a>
  )
}

export default CloseCross
