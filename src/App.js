import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import PrivateUserRoute from './components/PrivateUserRoute';
import PrivateAuthorRoute from './components/PrivateAuthorRoute';
import PrivateEditorRoute from './components/PrivateEditorRoute';
import Swal from 'sweetalert2';
import NavBar from './components/NavBar';
import LoginPage from './components/LoginPage';
import AuthorsList from './components/AuthorsList';
import NewsList from './components/NewsList';
import NewsOpinionPage from './components/NewsOpinionPage'
import PostEditPage from './components/PostEditPage';
import RegisterPage from './components/RegisterPage';
import RememberPassPage from './components/RememberPassPage';
import Footer from './components/Footer';

function App() {

  const [usuario, setUsuario] = useState(null);
  const [búsqueda, setBúsqueda] = useState(null);

  const onLoginSuccess=(loggedUser)=>{
    setUsuario(loggedUser);
  }

  const onLogout=()=>{
    let url='http://localhost:8888/auth';

    fetch(url, {
      method: 'DELETE',
      credentials: 'include'
    }).then(
      response=>response.json()
    ).then(
      data=>{
        setUsuario(null);
        Swal.fire({
          text: data.message,
          icon: 'success'
        })
      }
    )
  }

  const onSearch=(término)=>{
    if (término==='') {
      término=null;
    }

    setBúsqueda(término);
  }

  return (
    <Router>
      <NavBar
        user={usuario}
        handleLoginSuccess={onLoginSuccess}
        handleLogout={onLogout}
        handleSearch={onSearch}
      />

      <Switch>
        <Route
          exact path='/'
          children={
            <NewsList
              búsqueda={búsqueda}
            />
          }
        />

        <Route
          exact path='/Iniciar-Sesión'
          children={
            <LoginPage
              handleLoginSuccess={onLoginSuccess}
            />
          }
        />

        <Route
          exact path='/Autores'
          children={<AuthorsList/>}
        />

        <Route
          exact path={`/Autor/:id`}
          children={
            <NewsList
              type='Autor'
            />
          }
        />

        <Route
          exact path='/:section/:title-nid:id'
          children={<NewsOpinionPage />}
        />
        
        <Route
          exact path='/Registrarse'
          children={
            <RegisterPage
              handleLoginSuccess={onLoginSuccess}
            />
          }
        />
        
        <Route
          exact path='/Recordar-Contraseña'
          children={<RememberPassPage />}
        />
        
        <Route
          exact path='/Sección/:title'
          children={
            <NewsList
              type='Sección'
            />
          }
        />

        <Route
          exact path='/Tema/:title'
          children={
            <NewsList
              type='Tema'
            />
          }
        />

        <PrivateUserRoute
          exact path='/Mi-Cuenta'
          children={<></>}
          user={usuario}
        />

        <PrivateAuthorRoute
            exact path='/Mis-Notas'
            children={
              <NewsList
                user={usuario}
                type='Mis Notas'
              />
            }
            user={usuario}
        />

        <PrivateAuthorRoute
          exact path='/Mis-Notas/Nueva-Nota'
          children={
            <PostEditPage
              newPost
            />
          }
          user={usuario}
        />

        <PrivateAuthorRoute
          exact path='/Mis-Notas/Editar-Nota/:id'
          children={
            <PostEditPage
              newPost
              edit
            />
          }
          user={usuario}
        />

        <PrivateEditorRoute
          exact path='/Notas-a-Editar'
          children={
            <NewsList
              user={usuario}
              type='Notas a Editar'
            />
          }
          user={usuario}
        />

        <PrivateEditorRoute
          exact path='/Notas-a-Editar/:id'
          children={
            <PostEditPage
              edit
            />
          }
          user={usuario}
        />

        <Redirect to={{pathname:'/'}}/>
        
      </Switch>
      
      <Footer />

      <style>
        {`
          :root{
            --colorFondo: #f5f5f5;
            --colorLetras: #252525;
            --transparentDarkBlue: rgba(0, 0, 139, 0.85);
            --hoverBlue: darkblue;
          }
          
          [data-theme="dark"]{
            --colorFondo: #252525;
            --colorLetras: #f5f5f5;
            --transparentDarkBlue: rgba(0, 0, 139, 0.5);
            --hoverBlue: lightblue;

            /* Helper variables to avoid duplication in the colors. */
            --ck-custom-foreground: hsl(255, 3%, 18%);
            --ck-custom-border: hsl(300, 1%, 22%);
            --ck-custom-white: hsl(0, 0%, 100%);

            /* -- Overrides generic colors. ------------------------------------------------------------- */

            --ck-color-base-background: var(--colorFondo);
            --ck-color-base-foreground: var(--colorFondo);
            --ck-color-focus-border: hsl(208, 90%, 62%);
            --ck-color-text: hsl(0, 0%, 98%);
            --ck-color-shadow-drop: hsla(0, 0%, 0%, 0.2);
            --ck-color-shadow-inner: hsla(0, 0%, 0%, 0.1);

            /* -- Overrides the default .ck-button class colors. ---------------------------------------- */

            --ck-color-button-default-background: var(--colorFondo);
            --ck-color-button-default-hover-background: hsl(270, 1%, 22%);
            --ck-color-button-default-active-background: hsl(270, 2%, 20%);
            --ck-color-button-default-active-shadow: hsl(270, 2%, 23%);
            --ck-color-button-default-disabled-background: var(--colorFondo);

            --ck-color-button-on-background: var(--ck-custom-foreground);
            --ck-color-button-on-hover-background: hsl(255, 4%, 16%);
            --ck-color-button-on-active-background: hsl(255, 4%, 14%);
            --ck-color-button-on-active-shadow: hsl(240, 3%, 19%);
            --ck-color-button-on-disabled-background: var(--ck-custom-foreground);

            --ck-color-button-action-background: hsl(168, 76%, 42%);
            --ck-color-button-action-hover-background: hsl(168, 76%, 38%);
            --ck-color-button-action-active-background: hsl(168, 76%, 36%);
            --ck-color-button-action-active-shadow: hsl(168, 75%, 34%);
            --ck-color-button-action-disabled-background: hsl(168, 76%, 42%);
            --ck-color-button-action-text: var(--ck-custom-white);

            --ck-color-button-save: hsl(120, 100%, 46%);
            --ck-color-button-cancel: hsl(15, 100%, 56%);

            /* -- Overrides the default .ck-dropdown class colors. -------------------------------------- */

            --ck-color-dropdown-panel-background: var(--colorFondo);
            --ck-color-dropdown-panel-border: var(--ck-custom-foreground);

            /* -- Overrides the default .ck-splitbutton class colors. ----------------------------------- */

            --ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
            --ck-color-split-button-hover-border: var(--ck-custom-foreground);

            /* -- Overrides the default .ck-input class colors. ----------------------------------------- */

            --ck-color-input-background: var(--ck-custom-foreground);
            --ck-color-input-border: hsl(257, 3%, 43%);
            --ck-color-input-text: hsl(0, 0%, 98%);
            --ck-color-input-disabled-background: hsl(255, 4%, 21%);
            --ck-color-input-disabled-border: hsl(250, 3%, 38%);
            --ck-color-input-disabled-text: hsl(0, 0%, 46%);

            /* -- Overrides the default .ck-list class colors. ------------------------------------------ */

            --ck-color-list-background: var(--colorFondo);
            --ck-color-list-button-hover-background: var(--ck-color-base-foreground);
            --ck-color-list-button-on-background: var(--ck-color-base-active);
            --ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);
            --ck-color-list-button-on-text: var(--ck-color-base-background);

            /* -- Overrides the default .ck-balloon-panel class colors. --------------------------------- */

            --ck-color-panel-background: var(--colorFondo);
            --ck-color-panel-border: var(--ck-custom-border);

            /* -- Overrides the default .ck-toolbar class colors. --------------------------------------- */

            --ck-color-toolbar-background: var(--colorFondo);
            --ck-color-toolbar-border: var(--ck-custom-border);

            /* -- Overrides the default .ck-tooltip class colors. --------------------------------------- */

            --ck-color-tooltip-background: hsl(252, 7%, 14%);
            --ck-color-tooltip-text: hsl(0, 0%, 93%);

            /* -- Overrides the default colors used by the ckeditor5-image package. --------------------- */

            --ck-color-image-caption-background: hsl(0, 0%, 97%);
            --ck-color-image-caption-text: hsl(0, 0%, 20%);

            /* -- Overrides the default colors used by the ckeditor5-widget package. -------------------- */

            --ck-color-widget-blurred-border: hsl(0, 0%, 87%);
            --ck-color-widget-hover-border: hsl(43, 100%, 68%);
            --ck-color-widget-editable-focus-background: var(--ck-custom-white);

            /* -- Overrides the default colors used by the ckeditor5-link package. ---------------------- */

            --ck-color-link-default: hsl(190, 100%, 75%);
          }
          
          *{
            font-family: 'Crimson Text', serif;
            color: var(--colorLetras);
          }
          
          body, .swal2-popup{
            background: var(--colorFondo);
          }

          a, ::placeholder{
            color: var(--colorLetras);
          }
          
          .i-hover:hover, div>a>svg>path:hover{
            color: darkblue;
          }

          .divider{
            background-color: var(--transparentDarkBlue);
          }

          .swal2-popup{
            border: 1px solid var(--transparentDarkBlue);
          }

          .main-col>.card{
            display: flex;
            flex-direction: column-reverse;
          }

          .main-col>.card>.card-image>a>img{
              max-height: 400px !important;
          }

          .main-col>.card>.card-image>.card-section{
              top: auto !important;
              bottom: 0 !important;
          }

          .main-col>.card>.card-content>a>.card-title{
              font-size: 2rem !important;
          }

          .row>.card{
            width: 30%;
            margin-top: 5px !important;
          }

          .most-read>.card{
            width: 17%;
          }

          .most-read>.card>.card-content>a>.card-title{
              font-size: 1.1rem !important;
          }

          @media only screen and (max-width: 600px) {
            .col{
              border-left: 0px !important;
              padding: 0px !important;
            }

            .main-aside{
                margin-bottom: -14px;
            }

            .main-col>.card{
                display: block !important;
            }

            .main-col>.card>.card-image>.card-section{
                top: 0 !important;
                bottom: auto !important;
            }

            .main-col>.card>.card-content>a>.card-title{
                font-size: 1.4rem !important;
            }

            .row{
                display: block !important;
            }
            
            .row>.card{
                width: auto;
            }

            .most-read>.card>.card-content>a>.card-title{
              font-size: 1.4rem !important;
            }
          }
        `}
      </style>
    </Router>
  );
}

export default App;