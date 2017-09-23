import React from 'react'
import logoImage from './CMX_SISMO_ICON_04-01.png'
import './Layout.css'

const Layout = ({ children }) => {
  return (
    <div className="App">
      <div className="App-header">
        <div className="logo">
          <img src={logoImage} alt="CMX" />
          <h1 className="title"><a href="/">Sismo MX</a></h1>
          <h2 className="smalltitle">| Centros de acopio</h2>
        </div>

        <h1 className="sub-title">Información de centros de acopio</h1>
        <a href="/map">Mapa</a>
      </div>

      <div className="App-body">
        {children}
      </div>
    </div>
  )
}

export default Layout
