import React, { Component } from 'react'

import AcopioList from '../components/AcopioList'
import api from '../api'
import DocumentTitle from 'react-document-title'
import normalize from '../utils/normalize'
import withCurrentPosition from '../components/withCurrentPosition'

const ACOPIOS_LIMIT = 20

const getNearbyAcopios = (position) => {
  if (!position) {
    return Promise.reject(new Error('no location'))
  }

  const filter = {
    where: {
      geopos: {
        near: position
      }
    },
    include: "productos",
    limit: ACOPIOS_LIMIT
  }

  return api.getAcopiosWhere(JSON.stringify(filter))
}

const getRecentlyUpdatedAcopios = () => {

  const filter = {
    "include":{
        "relation":"productos",
        "scope":{
            "order":"fechaDeActualizacion DESC"
        }
    },
    "order":"fechaDeActualizacion DESC",
    "limit":ACOPIOS_LIMIT
  }

  return api.getAcopiosWhere(JSON.stringify(filter))
}

class Supply extends Component {
  constructor (props) {
    super(props)
    this.state = {
      acopios: [],
    }

    this.tryToLoadNearbyCenters(props.currentPosition)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentPosition !== this.props.currentPosition) {
      this.tryToLoadNearbyCenters(nextProps.currentPosition)
    }
  }

  tryToLoadNearbyCenters (currentPosition) {
    if (!currentPosition) {
      this.setState({ isLoading: true })
      return getRecentlyUpdatedAcopios()
        .then((response) => {
          this.setState({
            acopios: response.data,
            isLoading: false
          })
        })
        .catch(err => {
          this.setState({
            hasError: true,
            isLoading: false,
          })
          console.error(err)
        })
    }

    this.setState({ isLoading: true })
    return getNearbyAcopios(currentPosition)
      .then((response) => {
        this.setState({
          acopios: response.data,
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({
          hasError: true,
          isLoading: false,
        })
        console.error(err)
      })
  }
  getAcopiosList(title, isLoading, acopios) {
      return <DocumentTitle title={title}>
        <AcopioList
          isLoading={isLoading}
          acopios={acopios}
          displayProducts
        />
      </DocumentTitle>
  }

  render () {
    const { acopios, isLoading } = this.state
    const { positionUnknown, positionUnavailable } = this.props
    console.log(acopios)

    if (positionUnknown) {
      return (
        this.getAcopiosList(title, isLoading, acopios)
      )
    }

    if (positionUnavailable) {
      return <span>Ubicación no disponible</span>
    }

    const title = process.env.REACT_APP_NAME
    return (
      this.getAcopiosList(title, isLoading, acopios)
    )
  }
}

export default withCurrentPosition(Supply)
