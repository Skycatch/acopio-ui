import React from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import withCurrentPosition from './withCurrentPosition'
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar'

const GeolocationPermissionToolbar = ({
  currentPosition,
  positionDeclined,
  positionUnavailable,
  onClick
}) => {
  if (currentPosition || positionDeclined) {
    return null
  }

  if (positionUnavailable) {
    return (
      <div style={{height: 44, display: 'flex', alignItems: 'center'}}>
        Hubo un error obteniendo tu posición
      </div>
    )
  }

  return (
    <Toolbar>
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
