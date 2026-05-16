import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultPhoto from '../../images/defaultPhoto.png'
import styles from './styles.module.css'

function LoggedInDropdown(props) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    closeDropdown()
    props.handleLogout()
  }

  return (
    <div className={styles.dropdown}>
      <button className={styles.trigger} onClick={toggleDropdown}>
        <img
          src={props.user.photo || DefaultPhoto}
          alt={props.user.name}
          className={styles.image}
        />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {props.user.role === 'Usuario' ? (
            <Link
              to='/Mi-Cuenta'
              className={styles.menuItem}
              onClick={closeDropdown}
            >
              Mi Cuenta
            </Link>
          ) : props.user.role === 'Editor' ? (
            <Link
              to='/Notas-A-Editar'
              className={styles.menuItem}
              onClick={closeDropdown}
            >
              Notas a Editar
            </Link>
          ) : (
            <Link
              to='/Mis-Notas'
              className={styles.menuItem}
              onClick={closeDropdown}
            >
              Mis Notas
            </Link>
          )}

          <button
            className={`${styles.menuItem} ${styles.logout}`}
            onClick={handleLogout}
          >
            Salir
          </button>
        </div>
      )}
    </div>
  )
}

export default LoggedInDropdown
