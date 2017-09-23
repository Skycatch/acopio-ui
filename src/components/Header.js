import React from 'react'

const Header = function(props) {
  return (
    <div className="App-header">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + 'CMX_SISMO_ICON_04-01.png'} alt="CMX"/>
        <h1 className="title"><a href="/">Sismo MX</a></h1>
        <h2 className="smalltitle">| Centros de acopio</h2>
      </div>
      
      <h1 className="sub-title">Información de centros de acopio</h1>
      {props.children}      
    </div>
  )
}

export default Header