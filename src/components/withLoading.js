import React from 'react'

const withLoading = Component => ({isLoading, ...props}) => (
  isLoading
    ? <span>cargando</span>
    : <Component {...props} />
)

export default withLoading
