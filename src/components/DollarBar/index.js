import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css'

const DollarBar = () => {
  const [precios, setPrecios] = useState([])

  useEffect(() => {
    let mounted = true

    fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
      .then((response) => response.json())
      .then((data) => {
        if (mounted) {
          setPrecios(data)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className={styles.dollarBar}>
      {precios[0] && (
        <p className={styles.price}>
          <span className={styles.hideMedUp} />

          {'Dólar BNA: '}

          <strong className={styles.priceValue}>
            {'$' + precios[0].casa.compra}
          </strong>

          {' / '}

          <strong className={styles.priceValue}>
            {'$' + precios[0].casa.venta + ' '}
          </strong>

          {precios[0].casa.variacion > '0' ? (
            <FontAwesomeIcon icon={faArrowUp} />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} />
          )}

          <span className={styles.hideSmallOnly}>{' - '}</span>

          <span className={styles.hideMedUp}>
            <br />
          </span>

          {'Dólar Oficial: '}

          <strong className={styles.priceValue}>
            {'$' + precios[1].casa.compra}
          </strong>

          {' / '}

          <strong className={styles.priceValue}>
            {'$' + precios[1].casa.venta}
          </strong>
        </p>
      )}
    </div>
  )
}

export default DollarBar
