import React from 'react'

import { Subscriber } from 'react-broadcast'
import { channel } from './PositionManager'

const withCurrentPosition = WrappedComponent => props => {
  return (
    <Subscriber channel={channel}>
      {value => <WrappedComponent {...props} {...value} />}
    </Subscriber>
  )
}

export default withCurrentPosition
