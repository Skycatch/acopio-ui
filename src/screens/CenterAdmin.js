import React, {Component} from 'react'
import {
  TextField,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton,
} from 'material-ui'

import { browserHistory } from 'react-router-dom'

import './CenterAdmin.css'

import api from '../api'

const serial = fn =>
  fn.reduce((promise, fn) =>
    promise.then(result => fn().then(Array.prototype.concat.bind(result))),
  Promise.resolve([]))

class CenterAdmin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      productList: [],
      filteredProducts: [],
      newProduct: '',
      filter: '',
      selected: []
    }
  }

  componentDidMount () {
    console.log({ browserHistory })
    const { id } = this.props.match.params
    const product = api.getProductosByAcopioId(id).then(({data: productList}) => {
      this.setState(() => ({ productList, filteredProducts: productList }))
    })

    product.then(() => {
      this.setState(() => ({ loading: false }))
    })
  }
    onChangeFilter = (evt, filter) => {
      const { productList } = this.state
      const inputValue = filter.trim().toLowerCase()
      const inputLength = inputValue.length
      const filteredProducts = inputLength === 0 ? productList : productList.filter(({nombre}) =>
        nombre.toLowerCase().slice(0, inputLength) === filter
      )
      this.setState(() => ({ filteredProducts, filter }))
    }

    onRowSelection = (selected) => {
      window.requestAnimationFrame(() => {
        this.setState(() => ({ selected }))
      })
    }

    onSave = () => {
      const { id } = this.props.match.params
      const { newProduct } = this.state
      api.saveProducto({
        acopioId: id,
        nombre: newProduct
      }).then((res) => {
        window.location.reload()
      })
    }
    onDelete = () => {
      const { selected, filteredProducts } = this.state
      if (selected === 'none') return
      this.setState(() => ({ loading: true }))
      const toDelete = (selected === 'all' ? filteredProducts : selected.map(index => filteredProducts[index])).map(({ id }) => id)

      const fns = toDelete.map(id => () => api.deleteProducto(id))
      serial(fns).then((res) => {
        window.location.reload()
      })
    }
    render () {
      const { newProduct, filteredProducts, filter, selected } = this.state
      return this.state.loading ? <h1>Loading</h1> : (<div className="CenterAdmin">
        <TextField
          hintText="Nuevo Producto"
          value={newProduct}
          onChange={(evt, newProduct) => { this.setState(() => ({ newProduct })) }}
        />
        <br />
        <RaisedButton label="Crear" primary onClick={this.onSave} />
        <br />
        <TextField
          hintText="Filtrar"
          value={filter}
          onChange={this.onChangeFilter}
        />
        <br />
        <RaisedButton label="Borrar" secondary onClick={this.onDelete} />
        <Table multiSelectable onRowSelection={this.onRowSelection} >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Nombre</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map(({ nombre, id }, index) =>
              (<TableRow key={id} selected={selected.indexOf(index) !== -1}>
                <TableRowColumn>{nombre}</TableRowColumn>
              </TableRow>)
            )}
          </TableBody>
        </Table>
        <RaisedButton label="Borrar" secondary onClick={this.onDelete} />
      </div>)
    }
}

export default CenterAdmin
