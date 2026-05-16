import React from 'react'
import RowHeader from '../RowHeader/index'
import styles from './styles.module.css'

const NewsRow = (props) => {
  return (
    <>
      {props.headerTitle &&
        (props.authorPhoto ? (
          <RowHeader
            headerTitle={props.headerTitle}
            authorPhoto={props.authorPhoto}
          />
        ) : (
          <RowHeader
            headerTitle={props.headerTitle}
            topic={props.topic}
            withoutLink={props.withoutLink}
          />
        ))}

      <div
        className={`${styles.newsRow} ${props.mostRead ? styles.mostRead : ''}`}
      >
        {props.children}
      </div>
    </>
  )
}

export default NewsRow
