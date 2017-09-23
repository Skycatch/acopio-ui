import React from 'react'
import AcopioCard from './AcopioCard'
import withLoading from './withLoading'

const AcopioList = ({ acopios, currentPosition, displayProducts }) => (
  <div style={{padding: '0.5rem'}}>
    {acopios.map(acopio => (
      <AcopioCard
        key={`acopio-${acopio.id}`}
        acopio={acopio}
        currentPosition={currentPosition}
        displayProducts={displayProducts}
      />
    ))}
  </div>
)

export default withLoading(AcopioList)
