import React, {Component} from 'react'
import _ from 'lodash'
import DocumentTitle from 'react-document-title'
import {AutoComplete} from 'material-ui'

import AcopioList from '../components/AcopioList'
import api from '../api'
import getProductosForAcopioIds from '../utils/getProductosForAcopioIds'

class CenterSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      acopios: [],
      allAcopios: [],
      hasError: false,
      isLoading: false,
      products: [],
    }
  }

  componentDidMount () {
    this.loadCenters()
  }

  handleUpdateInput = (searchText) => {
    if (searchText) {
      api.getProductosByPartialName(searchText)
        .then(result => {
          let products = result.data || []
          // Filter unique products
          products = _.uniqBy(products, 'nombre')
          // Sort products by name ascending
          products = _.orderBy(products, ['nombre'])
          this.setState({
            products
          })
        })
        .catch(err => console.error(err))
    } else {
      this.setState({
        acopios: this.state.allAcopios
      })
    }
  }

  handleNewRequest = (item, index) => {
    // If a list item was selected and no ENTER was pressed
    if (index > -1) {
      const productName = item.nombre
      const productNameRegex = new RegExp(productName, 'i')
      const {acopios} = this.state
      const filteredAcopios = acopios.filter(acopio => {
        if (acopio.productos && acopio.productos.length) {
          const product = acopio.productos.find(product => product.nombre.match(productNameRegex))
          return !!product
        }
        return false
      })
      this.setState({
        acopios: filteredAcopios
      })
    }
  }

  loadCenters () {
    this.setState({
      isLoading: true
    })
    const filterString = JSON.stringify({limit: process.env.REACT_APP_MAX_RESULTS})
    api.getAcopiosWhere(filterString)
      .then(response => {
        let acopios = response.data.map(acopio => ({
          direccion: acopio.direccion,
          geopos: acopio.geopos,
          id: acopio.id,
          nombre: acopio.nombre,
          productos: []
        }))

        const acopioIds = acopios.map(acopio => acopio.id)
        getProductosForAcopioIds(acopioIds)
          .then(response => {
            const products = response.data
            products.forEach(product => {
              let acopio = acopios.find(acopio => acopio.id === product.acopioId)
              if (acopio) acopio.productos.push(product)
            })

            this.setState({
              acopios,
              allAcopios: acopios,
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
    const dataSourceConfig = {
      text: 'nombre',
      value: 'nombre'
    }
    const {
      acopios,
      isLoading,
      products
    } = this.state
    const title = `Busqueda de Centros de Acopio · ${process.env.REACT_APP_NAME}`
    return (
      <DocumentTitle title={title}>
        <div>
          <AutoComplete
            hintText="Busca centros de acopio por producto"
            dataSource={products}
            dataSourceConfig={dataSourceConfig}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            fullWidth
          />
          <AcopioList
            isLoading={isLoading}
            acopios={acopios}
          />
        </div>
      </DocumentTitle>
    )
  }
}

export default CenterSearch
