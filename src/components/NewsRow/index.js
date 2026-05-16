/* eslint-disable react/function-component-definition, react/prop-types, no-negated-condition */
import React from 'react'
import RowHeader from '../RowHeader/index'
import styles from './styles.module.css'

function NewsRow(props) {
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
