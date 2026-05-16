import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthorPhoto from '../AuthorPhoto/index'
import styles from './styles.module.css'

const AuthorsList = (props) => {
  const [autores, setAutores] = useState([])

  useEffect(() => {
    fetch(`https://caba-diario-backend.herokuapp.com/autores`)
      .then((response) => response.json())
      .then((data) => {
        setAutores(data)
      })
  }, [])

  const toLink = (word) => {
    if (word) {
      const space = / /g
      const undesirable = /[.$,:"']/g

      return word.replaceAll(space, '-').replace(undesirable, '')
    } else {
      return 'not-title'
    }
  }

  return (
    <div className={styles.container}>
      <h3>Autores</h3>

      <div className={styles.grid}>
        {autores.length >= 1 ? (
          autores.map((autor) => (
            <div className={styles.card} key={autor.Autor_ID}>
              <Link
                to={`/Autor/${toLink(autor.Autor_Nombre)}-${autor.Autor_ID}`}
                className={styles.link}
              >
                <h5>{autor.Autor_Nombre}</h5>

                <AuthorPhoto
                  src={autor.Autor_Foto}
                  alt={autor.Autor_Nombre}
                  style={{ margin: '0 auto' }}
                />
              </Link>
            </div>
          ))
        ) : (
          <div className={styles.loader}>
            <p>Cargando autores...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthorsList
