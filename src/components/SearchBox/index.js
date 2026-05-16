import React, { useState } from 'react'
import styles from './styles.module.css'

function SearchBox(props) {
  const [término, setTérmino] = useState('')

  const handleTérminoChange = (event) => {
    setTérmino(event.target.value)
    props.handleSearch(event.target.value)
  }

  return (
    <input
      id={props.id}
      type='text'
      placeholder='Buscar'
      className={styles.input}
      value={término}
      onChange={handleTérminoChange}
      style={props.style}
    />
  )
}

export default SearchBox
