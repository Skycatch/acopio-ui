import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}
const maringStyle = {
  marginTop: '2rem',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
}

const withLoading = Component => ({isLoading, ...props}) => (
  isLoading
    ? <div style={maringStyle}><RefreshIndicator
      left={10}
      top={0}
      status="loading"
      style={style.refresh}
      size={40}
    /></div>
    : <Component {...props} />
)

export default withLoading
