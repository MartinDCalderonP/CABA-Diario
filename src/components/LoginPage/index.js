/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'
import FormPage from '../FormPage/index'
import ThisButton from '../ThisButton/index'
import styles from './styles.module.css'

const LoginPage = (props) => {
  const [redirect, setRedirect] = useState(false)

  const [nombre, setNombre] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [rol, setRol] = useState('')

  const handleUserChange = (event) => {
    setNombre(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setContraseña(event.target.value)
  }

  const handleRoleChange = (event) => {
    setRol(event.target.value)
  }

  const handleLoginClick = () => {
    const endpoint = rol === '1' ? '/autores' : '/editores'

    const url = `https://caba-diario-backend.herokuapp.com/auth${endpoint}`

    const params = {
      user: nombre,
      password: contraseña
    }

    fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
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

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <div className={styles.container}>
      <FormPage title='Iniciar Sesión'>
        <div className={styles.formGroup}>
          <label htmlFor='login-page-user' className={styles.label}>
            Nombre de Usuario o Correo
          </label>

          <input
            id='login-page-user'
            type='email'
            className={styles.input}
            value={nombre}
            onChange={handleUserChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='login-page-pass' className={styles.label}>
            Contraseña
          </label>

          <input
            id='login-page-pass'
            type='password'
            className={styles.input}
            value={contraseña}
            onChange={handlePasswordChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='role-select' className={styles.label}>
            Elija su rol
          </label>

          <select
            id='role-select'
            className={styles.select}
            value={rol}
            onChange={handleRoleChange}
          >
            <option value=''>Elija su rol.</option>
            <option value='1'>Autor</option>
            <option value='2'>Editor de Sección</option>
          </select>
        </div>

        <ThisButton onClick={handleLoginClick}>Iniciar Sesión</ThisButton>
      </FormPage>
    </div>
  )
}

export default LoginPage
