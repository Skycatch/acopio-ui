import React from 'react'
import logoImage from './CMX_SISMO_ICON_04-01.png'
import { AppBar, FlatButton } from 'material-ui'
import { withRouter } from 'react-router'

const appName = process.env.REACT_APP_NAME

const Layout = ({ children, history }) => {
  return (
    <div>
      <AppBar
        style={{position: 'fixed', top: '0', backgroundColor: '#191E1B'}}
        title={<div onClick={() => { history.push('/') }}>{appName}</div>}
        iconElementLeft={<img src={logoImage} alt="CMX" style={{height: 56}} />}
        iconElementRight={<FlatButton label="Mapa" onClick={() => { history.push('/map') }} />}
      />
      <div className="App-body" style={{padding: '5rem 0.5rem 0'}}>
        {children}
      </div>
    </div>
  )
}

export default withRouter(Layout)
