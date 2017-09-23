import React from 'react'
import AcopioCard from './AcopioCard'
import withLoading from './withLoading'

const AcopioList = ({ acopios, currentLocation }) => (
  <div>
    {acopios.map(acopio => (
      <AcopioCard
        key={`acopio-${acopio.id}`}
        acopio={acopio}
        currentLocation={currentLocation}
      />
    ))}
  </div>
)

export default withLoading(AcopioList)
