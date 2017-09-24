import React, {Component} from 'react'
import _ from 'lodash'
import DocumentTitle from 'react-document-title'
import {AutoComplete} from 'material-ui'

import AcopioList from '../components/AcopioList'
import api from '../api'

/**
 * Maximum number of results.
 * @type {Number}
 * @constant
 */
const MAX_RESULTS = 3

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
      const component = this
      api.getProductosByPartialName(searchText)
        .then(result => {
          let products = result.data || []
          // Filter unique products
          products = _.uniqBy(products, 'nombre')
          // Sort products by name ascending
          products = _.orderBy(products, ['nombre'])
          component.setState({
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
        if (acopio.products && acopio.products.length) {
          const product = acopio.products.find(product => product.nombre.match(productNameRegex))
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
    api.getAcopios()
      .then(response => {
        let acopios = response.data.map(acopio => ({
          direccion: acopio.direccion,
          geopos: acopio.geopos,
          id: acopio.id,
          nombre: acopio.nombre,
          products: []
        })).slice(0, MAX_RESULTS)

        let acopiosPromises = []
        acopios.forEach(acopio => {
          acopiosPromises.push(new Promise((resolve, reject) => {
            api.getProductosByAcopioId(acopio.id)
              .then(response => {
                acopio.products = response.data
                resolve(acopio)
              })
              .catch(reject)
          }))
        })
        return Promise.all(acopiosPromises)
      })
      .then(acopios => {
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
