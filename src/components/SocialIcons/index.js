/* eslint-disable react/function-component-definition, react/prop-types */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
  faLinkedinIn,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import styles from './styles.module.css'

function SocialIcons(props) {
  return (
    <div className={styles.container} style={props.style}>
      {props.facebook && (
        <a href={`http://www.fb.com/${props.facebook}`} className={styles.link}>
          <FontAwesomeIcon icon={faFacebook} size='2x' />
        </a>
      )}

      {props.twitter && (
        <a
          href={`http://www.twitter.com/${props.twitter}`}
          className={styles.link}
        >
          <FontAwesomeIcon icon={faTwitter} size='2x' />
        </a>
      )}

      {props.instagram && (
        <a
          href={`http://www.instagram.com/${props.instagram}`}
          className={styles.link}
        >
          <FontAwesomeIcon icon={faInstagram} size='2x' />
        </a>
      )}

      {props.youTube && (
        <a
          href={`http://www.youtube.com/${props.youTube}`}
          className={styles.link}
        >
          <FontAwesomeIcon icon={faYoutube} size='2x' />
        </a>
      )}

      {props.whatsApp && (
        <a
          href={`http://www.whatsapp.com/${props.whatsApp}`}
          className={styles.link}
        >
          <FontAwesomeIcon icon={faWhatsapp} size='2x' />
        </a>
      )}

      {props.linkedIn && (
        <a
          href={`http://www.linkedin.com/${props.linkedIn}`}
          className={styles.link}
        >
          <FontAwesomeIcon icon={faLinkedinIn} size='2x' />
        </a>
      )}
    </div>
  )
}

export default SocialIcons
