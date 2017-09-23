import React from 'react'
import logoImage from './CMX_SISMO_ICON_04-01.png'

const Layout = ({ children }) => {
  return (
    <div className="App drawer-container">
      <div className="App-header">
        <h1 className="title">Sismo MX</h1>
        <h1 className="sub-title">Información de centros de acopio</h1>
        <button>Cerca de mí</button>
        <img src={logoImage} alt="CMX" />
      </div>
      <div className="cta">Quiero Ayudar</div>
      <div className="App-body">
        {children}
      </div>
    </div>
  )
}

export default Layout
