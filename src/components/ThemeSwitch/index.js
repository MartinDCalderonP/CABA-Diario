import React, { useEffect } from 'react'
import FaviconLight from '../../images/favicons/faviconLight.png'
import FaviconDark from '../../images/favicons/faviconDark.png'
import LogoLight from '../../images/logos/logoLight.png'
import LogoDark from '../../images/logos/logoDark.png'
import styles from './styles.module.css'

export default () => {
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')

    const themeSwitch = document.getElementById('theme-switch')

    if (currentTheme === 'dark') {
      if (themeSwitch) {
        themeSwitch.checked = true
      }
      switchTheme()
    } else {
      document.getElementById('favicon')?.setAttribute('href', FaviconLight)
    }
  }, [])

  const switchTheme = () => {
    const dataTheme = document.documentElement.getAttribute('data-theme')

    const switchLogos = document.getElementsByClassName('switch-logo')

    if (dataTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme')

      localStorage.setItem('theme', 'light')

      document.getElementById('favicon')?.setAttribute('href', FaviconLight)

      for (let switchLogo of switchLogos) {
        switchLogo.setAttribute('src', LogoLight)
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')

      localStorage.setItem('theme', 'dark')

      document.getElementById('favicon')?.setAttribute('href', FaviconDark)

      for (let switchLogo of switchLogos) {
        switchLogo.setAttribute('src', LogoDark)
      }
    }
  }

  return (
    <div id='theme-switch-div' className={styles.container}>
      <label htmlFor='theme-switch'>
        <div className={styles.item}>
          <span className={styles.text}>Modo Oscuro:</span>

          <input
            id='theme-switch'
            type='checkbox'
            className={styles.switch}
            onChange={() => switchTheme()}
          />
        </div>
      </label>
    </div>
  )
}
