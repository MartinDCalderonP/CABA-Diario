import React from 'react'
import styles from './styles.module.css'

const FormPage = (props) => {
  return (
    <>
      <div className={styles.formPage}>
        <h3 className={styles.title}>{props.title}</h3>

        {props.children}
      </div>

      <style>
        {`
          .file-field>.btn{
            background-color: transparent;
            color: var(--colorLetras);
            font-family: 'Crimson Text';
            border: 1px solid var(--transparentDarkBlue);
            border-radius: 5px;
            transition: .3s ease-out;
          }

          .file-field>.btn:hover{
            background-color: transparent;
            box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
          }

          .file-field>.btn:focus{
            background-color: transparent;
          }
        `}
      </style>
    </>
  )
}

export default FormPage
