import React from 'react'
import FormPage from '../FormPage/index'
import ThisButton from '../ThisButton/index'
import styles from './styles.module.css'

const RememberPassPage = () => {
  return (
    <FormPage title='Recordar contraseña'>
      <div className={styles.formGroup}>
        <label htmlFor='remember-pass-email' className={styles.label}>
          Email
        </label>

        <input
          id='remember-pass-email'
          type='email'
          className={styles.input}
          required
        />
      </div>

      <p className={styles.instruction}>
        Ingrese su email y le enviaremos información para recuperar su
        contraseña.
      </p>

      <ThisButton>Confirmar email</ThisButton>
    </FormPage>
  )
}

export default RememberPassPage
