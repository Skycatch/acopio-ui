import React from 'react'
import AcopioCard from './AcopioCard'
import withLoading from './withLoading'

const AcopioList = ({ acopios, skipProducts }) => (
  <div>
    {acopios.length === 0
      ? 'No encontramos Centros de Acopio cerca de ti.'
      : acopios.map(acopio => (
        <AcopioCard
          key={`acopio-${acopio.id}`}
          acopio={acopio}
          skipProducts={skipProducts}
        />
      ))
    }
  </div>
)

export default withLoading(AcopioList)
