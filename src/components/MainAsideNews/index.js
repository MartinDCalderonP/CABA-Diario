/* eslint-disable react/prop-types */
import React from 'react'
import RowHeader from '../RowHeader/index'
import styles from './styles.module.css'

const MainAsideNews = (props) => {
  return (
    <>
      {props.headerTitle && (
        <RowHeader headerTitle={props.headerTitle} topic={props.topic} />
      )}

      <div className={styles.mainAside}>
        <div className={styles.mainCol}>{props.main}</div>

        <div className={styles.asideCol}>
          {props.asideUp}

          <div className={styles.divider} />

          {props.asideDown}
        </div>
      </div>
    </>
  )
}

export default MainAsideNews
