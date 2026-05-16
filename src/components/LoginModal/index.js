import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import ThisButton from '../ThisButton/index'
import styles from './styles.module.css'

const LoginModal = (props) => {
  const [nombreDeUsuario, setNombreDeUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash === '#login-modal')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleUserNameChange = (event) => {
    setNombreDeUsuario(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setContraseña(event.target.value)
  }

  const handleLoginClick = () => {
    const url = `https://caba-diario-backend.herokuapp.com/auth/usuarios`

    const params = {
      user: nombreDeUsuario,
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
          closeModal()
        } else {
          Swal.fire({
            text: data.message,
            icon: 'error'
          })
        }
      })
  }

  const closeModal = () => {
    window.location.hash = ''
    setIsOpen(false)
  }

  return (
    <>
      <a
        className={styles.trigger}
        href='#login-modal'
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(true)
          window.location.hash = 'login-modal'
        }}
      >
        <span className={styles.accountIcon}>👤</span>
      </a>

      {isOpen && (
        <>
          <div className={styles.modalOverlay} onClick={closeModal} />

          <div id='login-modal' className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Iniciar Sesión</h2>

                <button
                  className={styles.closeButton}
                  onClick={closeModal}
                  type='button'
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label
                    htmlFor='login-modal-userName'
                    className={styles.label}
                  >
                    Nombre de Usuario o Correo
                  </label>

                  <input
                    id='login-modal-userName'
                    type='email'
                    className={styles.input}
                    value={nombreDeUsuario}
                    onChange={handleUserNameChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor='login-modal-pass' className={styles.label}>
                    Contraseña
                  </label>

                  <input
                    id='login-modal-pass'
                    type='password'
                    className={styles.input}
                    value={contraseña}
                    onChange={handlePasswordChange}
                  />
                </div>

                <p className={styles.registerLink}>
                  <Link to='/Registrarse' onClick={closeModal}>
                    ¡Registrate en CABA Diario!
                  </Link>
                </p>
              </div>

              <div className={styles.modalFooter}>
                <ThisButton onClick={handleLoginClick}>Ingresar</ThisButton>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default LoginModal
