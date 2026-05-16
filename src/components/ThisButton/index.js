/* eslint-disable react/prop-types */
import React from 'react'
import styles from './styles.module.css'

const ThisButton = (props) => {
  return (
    <button
      type='button'
      className={styles.button}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </button>
  )
}

export default ThisButton
