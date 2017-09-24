import React, {
  Component
} from 'react'

import AcopioList from '../components/AcopioList'
import api from '../api'

const getAcopios = () => api.getAcopios()

class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      acopios: [],
      isLoading: false
    }
  }

  componentWillMount () {
    this.loadAcopios()
  }

  loadAcopios () {
    this.setState({ isLoading: true })

    return getAcopios()
      .then(response => {
        const acopios = response.data
          .map(acopio => ({
            id: acopio.id,
            direccion: acopio.direccion,
            geopos: acopio.geopos,
            nombre: acopio.nombre,
            productos: [],
          }))

        this.setState({
          acopios,
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
      acopios,
      isLoading,
    } = this.state

    return (
      <AcopioList
        isLoading={isLoading}
        acopios={acopios}
        skipProducts
      />
    )
  }
}

export default List
