/* eslint-disable react/function-component-definition, react/prop-types */
import React from 'react'
import styles from './styles.module.css'

function ThisButton(props) {
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
