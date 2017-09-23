import React, {
  Component
} from 'react'

import AcopioList from '../components/AcopioList'
import api from '../api'
import normalize from '../utils/normalize'

const getAcopios = () => api.getAcopios()

class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      acopioIds: [],
      acopioData: {},
      isLoading: false
    }
  }

  componentWillMount () {
    this.loadAcopios()
  }

  loadAcopios () {
    getAcopios()
      .then(() => {
        this.setState({
          isLoading: true
        })
        return getAcopios()
      })
      .then(response => {
        const acopios = response.data
          .map(acopio => ({
            id: acopio.id,
            direccion: acopio.direccion,
            geopos: acopio.geopos,
            nombre: acopio.nombre,
            products: [],
          }))
        const acopioIds = acopios.map(acopio => acopio.id)
        const acopioData = normalize(acopios)
        this.setState({
          acopioData,
          acopioIds,
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({
          hasError: true,
          isLoading: false
        })
        console.error(err)
      })
  }

  render () {
    const {
      acopioIds,
      acopioData,
      isLoading,
    } = this.state
    const acopios = acopioIds.map(id => acopioData[id])

    return (
      <AcopioList
        isLoading={isLoading}
        acopios={acopios}
      />
    )
  }
}

export default List
