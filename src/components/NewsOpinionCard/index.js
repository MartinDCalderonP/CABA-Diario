/* eslint-disable react/function-component-definition, react/prop-types, no-negated-condition */
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import AuthorPhoto from '../AuthorPhoto/index'
import ThisButton from '../ThisButton/index'
import styles from './styles.module.css'

function NewsOpinionCard(props) {
  const [redirect, setRedirect] = useState(false)

  const handleDeleteClick = () => {
    Swal.fire({
      title: '¿Está seguro que desea eliminar la nota?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        fetch(`https://caba-diario-backend.herokuapp.com/notas/${props.id}`, {
          method: 'DELETE',
          credentials: 'include'
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'Ok.') {
              Swal.fire({
                text: data.message,
                icon: 'success'
              })

              setRedirect(true)
            } else {
              Swal.fire({
                text: data.message,
                icon: 'error'
              })
            }
          })
      }
    })
  }

  const toLink = (word) => {
    if (word) {
      const space = / /g
      const undesirable = /[.$,:"']/g

      return word.replaceAll(space, '-').replace(undesirable, '')
    }
    return 'not-title'
  }

  const newsUrl = `/${props.section}/${toLink(props.title)}-nid${props.id}`

  const authorUrl = `/Autor/${toLink(props.authorName)}-${props.authorId}`

  if (redirect) {
    return <Redirect to='/Mis-Notas' />
  }

  return (
    <>
      {!props.opinion ? (
        <div className={`${styles.card} ${props.posted ? styles.blocked : ''}`}>
          <div className={styles.cardImage}>
            <Link to={newsUrl}>
              <img
                src={props.img}
                alt={props.imgFooter}
                className={styles.cardImg}
              />
            </Link>

            {!props.number ? (
              <Link
                className={styles.cardSection}
                to={'/Sección/' + props.section}
              >
                {props.section}
              </Link>
            ) : (
              <p className={styles.cardNumber}>{props.number}</p>
            )}
          </div>

          <div className={styles.cardContent}>
            <Link to={newsUrl}>
              <p className={styles.cardTitle}>{props.title}</p>
            </Link>

            {props.date && <p className={styles.cardDate}>{props.date}</p>}

            {!props.owner && props.authorName && (
              <p className={styles.authorP}>
                {'Por '}

                <Link to={authorUrl} className={styles.authorLink}>
                  {props.authorName}
                </Link>
              </p>
            )}

            {props.menu && (
              <>
                {!props.posted ? (
                  <div className={styles.menuDiv}>
                    <Link
                      to={
                        props.owner
                          ? '/Mis-Notas/Editar-Nota/' + props.id
                          : '/Notas-a-Editar/' + props.id
                      }
                    >
                      <ThisButton>
                        <FontAwesomeIcon icon={faEdit} />
                      </ThisButton>
                    </Link>

                    {props.owner && (
                      <ThisButton onClick={handleDeleteClick}>
                        <FontAwesomeIcon icon={faTrash} />
                      </ThisButton>
                    )}
                  </div>
                ) : (
                  <h6 className={styles.posted}>
                    Esta nota ya fue posteada y no se puede editar.
                  </h6>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.opinionCard}>
          <Link to={newsUrl} className={styles.opinionCardLink}>
            <p className={styles.opinionCardTitle}>{props.title}</p>
          </Link>

          <Link to={authorUrl} className={styles.authorLink}>
            <AuthorPhoto
              src={props.authorPhoto}
              alt={props.authorName}
              style={{ margin: '0 auto' }}
            />

            {props.authorName}
          </Link>
        </div>
      )}
    </>
  )
}

export default NewsOpinionCard
