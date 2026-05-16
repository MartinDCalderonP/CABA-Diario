/* eslint-disable react/function-component-definition */
import React from 'react'
import UnderConstruction from '../../images/underConstruction.png'
import styles from './styles.module.css'

function MyAccount() {
  return (
    <div className={styles.container}>
      <img
        src={UnderConstruction}
        alt='Website Under Construction'
        className={styles.image}
      />
    </div>
  )
}

export default MyAccount
