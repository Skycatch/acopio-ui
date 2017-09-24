import React from 'react'
import AcopioCard from './AcopioCard'
import withLoading from './withLoading'

const AcopioList = ({ acopios, displayProducts }) => (
  <div>
    {acopios.length === 0
      ? 'No encontramos Centros de Acopio'
      : acopios.map(acopio => (
        <AcopioCard
          key={`acopio-${acopio.id}`}
          acopio={acopio}
          displayProducts={displayProducts}
        />
      ))
    }
  </div>
)

export default withLoading(AcopioList)
