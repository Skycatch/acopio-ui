import React from 'react'
import AcopioCard from './AcopioCard'
import withLoading from './withLoading'

const AcopioList = ({ acopios }) => (
  <div style={{padding: '0.5rem'}}>
    {acopios.length === 0
      ? 'No hay Centros de Acopio cercanos'
      : acopios.map(acopio => (
        <AcopioCard
          key={`acopio-${acopio.id}`}
          acopio={acopio}
        />
      ))
    }
  </div>
)

export default withLoading(AcopioList)
