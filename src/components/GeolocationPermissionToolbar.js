import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import withCurrentPosition from './withCurrentPosition'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'

const GeolocationPermissionToolbar = ({
  currentPosition,
  positionDeclined,
  positionUnavailable,
  onClick,
  style = {}
}) => {
  if (currentPosition || positionDeclined) {
    return null
  }

  if (positionUnavailable) {
    return (
      <div style={style}>
        <div style={{height: 44, display: 'flex', alignItems: 'center'}}>
          Hubo un error obteniendo tu posición
        </div>
      </div>
    )
  }

  return (
    <Toolbar style={{...style, padding: '0 0.5rem'}} noGutter>
      <ToolbarGroup>
        Centros de acopio más cercanos
      </ToolbarGroup>
      <ToolbarGroup lastChild>
        <RaisedButton label="Ubicar" primary onClick={onClick} />
      </ToolbarGroup>
    </Toolbar>
  )
}

export default withCurrentPosition(GeolocationPermissionToolbar)
