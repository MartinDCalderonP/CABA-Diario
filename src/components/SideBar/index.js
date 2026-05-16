import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LogoLight from '../LogoLight/index'
import CloseCross from '../CloseCross/index'
import SearchBox from '../SearchBox/index'
import ThemeSwitch from '../ThemeSwitch/index'
import styles from './styles.module.css'

const SideBar = (props) => {
  const [secciones, setSecciones] = useState([])
  const [expandedSection, setExpandedSection] = useState(null)

  useEffect(() => {
    fetch(`https://caba-diario-backend.herokuapp.com/secciones`)
      .then((response) => response.json())
      .then((data) => {
        setSecciones(data)
      })
  }, [])

  const closeSideBar = () => {
    const sidenav = document.getElementById('slide-out')
    if (sidenav) {
      sidenav.classList.remove(styles.sidenavOpen)
    }
  }

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  return (
    <div id='slide-out' className={styles.sidenav}>
      <div className={styles.header}>
        <LogoLight style={{ width: '220px' }} />

        <CloseCross className={styles.closeButton} onClick={closeSideBar} />
      </div>

      <hr className={styles.divider} />

      <div className={`${styles.search} hide-on-med-and-up`}>
        <SearchBox id='side-search-box' handleSearch={props.handleSearch} />
      </div>

      <hr className={`${styles.divider} hide-on-med-and-up`} />

      <Link to='/Autores' className={styles.menuItem} onClick={closeSideBar}>
        Autores
      </Link>

      <hr className={styles.divider} />

      <div className={styles.sectionsContainer}>
        <h4 className={styles.sectionTitle}>Secciones</h4>

        {secciones.map((seccion) => (
          <details
            key={seccion.Sección_ID}
            className={styles.collapsible}
            open={expandedSection === seccion.Sección_ID}
            onClick={() => toggleSection(seccion.Sección_ID)}
          >
            <summary className={styles.collapsibleHeader}>
              {seccion.Sección_Nombre}
            </summary>

            <div className={styles.collapsibleBody}>
              {seccion.Temas && seccion.Temas.length > 0 ? (
                seccion.Temas.map((tema) => (
                  <Link
                    key={tema.Tema_ID}
                    to={`/Temas/${tema.Tema_Nombre}`}
                    className={styles.themeLink}
                    onClick={closeSideBar}
                  >
                    {tema.Tema_Nombre}
                  </Link>
                ))
              ) : (
                <Link
                  to={`/Secciones/${seccion.Sección_Nombre}`}
                  className={styles.sectionLink}
                  onClick={closeSideBar}
                >
                  Ver Todos
                </Link>
              )}
            </div>
          </details>
        ))}
      </div>

      <hr className={styles.divider} />

      <ThemeSwitch />
    </div>
  )
}

export default SideBar
