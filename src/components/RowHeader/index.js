import React from 'react'
import { Link } from 'react-router-dom'
import AuthorPhoto from '../AuthorPhoto/index'
import styles from './styles.module.css'

const RowHeader = (props) => {
  const authorPhotoStyle = {
    display: 'inline-block',
    verticalAlign: 'bottom',
    marginLeft: '5px',
    ...props.authorPhotoStyle
  }

  return (
    <div className={styles.header}>
      <h3 className={styles.headerTitle}>
        {props.withoutLink || !props.headerTitle ? (
          props.headerTitle
        ) : (
          <Link
            to={(!props.topic ? '/Secciones/' : '/Temas/') + props.headerTitle}
          >
            {props.headerTitle}

            {props.authorPhoto && (
              <AuthorPhoto
                src={props.authorPhoto}
                alt={props.headerTitle}
                style={authorPhotoStyle}
              />
            )}
          </Link>
        )}
      </h3>
    </div>
  )
}

export default RowHeader
