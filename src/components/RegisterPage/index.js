import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'
import FormPage from '../FormPage/index'
import ThisButton from '../ThisButton/index'
import styles from './styles.module.css'

const RegisterPage = (props) => {
  const [redirect, setRedirect] = useState(false)

  const [nombreDeUsuario, setNombreDeUsuario] = useState('')
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [contraseñaRepetida, setContraseñaRepetida] = useState('')

  const handleUserNameChange = (event) => {
    setNombreDeUsuario(event.target.value)
  }

  const handleEmailChange = (event) => {
    setCorreo(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setContraseña(event.target.value)
  }

  const handleRepeatedPasswordChange = (event) => {
    setContraseñaRepetida(event.target.value)
  }

  const handleRegisterClick = () => {
    const formData = new FormData()

    formData.append('NombreDeUsuario', nombreDeUsuario)
    formData.append('Correo', correo)
    formData.append('Contraseña', contraseña)

    const url = `https://caba-diario-backend.herokuapp.com/register/usuarios`

    fetch(url, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'Ok.') {
          props.handleLoginSuccess(data.loggedUser)

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

  const isPasswordMismatch =
    contraseña !== contraseñaRepetida && contraseñaRepetida !== ''

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <div className={styles.container}>
      <FormPage title='Registrarse'>
        <div className={styles.formGroup}>
          <label htmlFor='register-username' className={styles.label}>
            Nombre de Usuario
          </label>

          <input
            id='register-username'
            type='text'
            className={styles.input}
            value={nombreDeUsuario}
            onChange={handleUserNameChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='register-email' className={styles.label}>
            Email
          </label>

          <input
            id='register-email'
            type='email'
            className={styles.input}
            value={correo}
            onChange={handleEmailChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='register-pass' className={styles.label}>
            Contraseña
          </label>

          <input
            id='register-pass'
            type='password'
            className={styles.input}
            value={contraseña}
            onChange={handlePasswordChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='register-repeatpass' className={styles.label}>
            Repetir Contraseña
          </label>

          <input
            id='register-repeatpass'
            type='password'
            className={styles.input}
            value={contraseñaRepetida}
            onChange={handleRepeatedPasswordChange}
          />
        </div>

        {isPasswordMismatch && (
          <p className={styles.error}>Las contraseñas no coinciden.</p>
        )}

        <p className={styles.link}>
          {'¿Ya estás registrado? '}

          <a className='modal-trigger' href='#login-modal'>
            Iniciá sesión
          </a>
        </p>

        <ThisButton
          onClick={handleRegisterClick}
          disabled={contraseña !== contraseñaRepetida}
        >
          Confirmar registro
        </ThisButton>
      </FormPage>
    </div>
  )
}

export default RegisterPage
