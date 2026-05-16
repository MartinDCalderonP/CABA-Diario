import React from 'react'
import FormPage from '../FormPage/index'
import styles from './styles.module.css'

function PostEditPage() {
  return (
    <div className={styles.container}>
      <FormPage title='Editar Nota'>
        <div className={styles.construction}>
          <p>Página de edición en construcción</p>
        </div>
      </FormPage>
    </div>
  )
}

export default PostEditPage
