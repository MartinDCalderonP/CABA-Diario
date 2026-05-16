import React, { useState } from 'react'
import SearchBox from '../SearchBox/index'
import LogoLight from '../LogoLight/index'
import LoginModal from '../LoginModal/index'
import LoggedInDropdown from '../LoggedInDropdown/index'
import styles from './styles.module.css'

function NavBar(props) {
  const [showSB, setShowSB] = useState(false)

  const showSearchBox = () => {
    setShowSB(!showSB)
    if (showSB) {
      props.handleSearch(null)
    }
  }

  const handleLogoClick = () => {
    setShowSB(false)
    props.handleSearch(null)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <button
          className={`${styles.menuButton} show-on-medium-and-up`}
          onClick={() => {
            const sidenav = document.getElementById('slide-out')
            if (sidenav) {
              sidenav.classList.toggle(styles.sidenavOpen)
            }
          }}
        >
          ☰
        </button>

        <div className={styles.searchDiv}>
          <a
            href='#!'
            onClick={(e) => {
              e.preventDefault()
              showSearchBox()
            }}
            className={styles.searchToggle}
          >
            🔍
          </a>

          <SearchBox
            id='nav-search-box'
            style={{
              height: '2.5rem',
              width: showSB ? '10rem' : '0px',
              margin: '0px 0px 0px 5px',
              border: showSB
                ? '1px solid var(--transparentDarkBlue)'
                : '0px none',
              paddingLeft: showSB ? '20px' : '0px',
              transition: '0.3s'
            }}
            handleSearch={props.handleSearch}
          />
        </div>

        <LogoLight style={{ width: '200px' }} onClick={handleLogoClick} />

        <div className={styles.authSection}>
          {props.user ? (
            <LoggedInDropdown
              user={props.user}
              handleLogout={props.handleLogout}
            />
          ) : (
            <LoginModal handleLoginSuccess={props.handleLoginSuccess} />
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
