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
import {Link} from 'react-router-dom'
import api from '../../api'
import GoogleMapImage from '../googleMapImage.js'
import './admin.css'
import './ViewCenter.css'

const serial = fn =>
  fn.reduce((promise, fn) =>
    promise.then(result => fn().then(Array.prototype.concat.bind(result))),
  Promise.resolve([]))

class ViewCenter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      center: {},
      productList: [],
      filteredProducts: [],
      newProduct: '',
      filter: '',
      selected: []
    }
    this.onChangeFilter = this.onChangeFilter.bind(this)
    this.onRowSelection = this.onRowSelection.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  componentDidMount () {
    this.initComp()
  }

  initComp () {
    const { id } = this.props.match.params
    this.setState(() => ({ loading: true }))

    const acopioPromise = api.getAcopio(id).then(res => res.data)
    const productPromise = api.getProductosByAcopioId(id).then(res => res.data)

    Promise.all([acopioPromise, productPromise])
      .then(([center, productList]) => {
        this.setState({
          center,
          productList,
          filter: '',
          newProduct: '',
          loading: false,
          filteredProducts: productList,
        })
      })
  }

  onChangeFilter (evt, filter) {
    const { productList } = this.state
    const inputValue = filter.trim().toLowerCase()
    const inputLength = inputValue.length
    const filteredProducts = inputLength === 0 ? productList : productList.filter(({nombre}) =>
      nombre.toLowerCase().slice(0, inputLength) === filter
    )
    this.setState(() => ({ filteredProducts, filter }))
  }

  onRowSelection (selected) {
    window.requestAnimationFrame(() => {
      this.setState(() => ({ selected }))
    })
  }

  onSave () {
    const { id } = this.props.match.params
    const { newProduct } = this.state
    api.saveProducto({
      acopioId: id,
      nombre: newProduct
    }).then((res) => {
      this.initComp()
    })
  }

  onDelete () {
    const { selected, filteredProducts } = this.state
    if (selected === 'none') return
    this.setState(() => ({ loading: true }))
    const toDelete = (selected === 'all' ? filteredProducts : selected.map(index => filteredProducts[index])).map(({ id }) => id)

    const fns = toDelete.map(id => () => api.deleteProducto(id))
    serial(fns).then((res) => {
      this.initComp()
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <div className="container"><h1>Loading</h1></div>
      )
    }

    const { newProduct, filteredProducts, filter, selected, center } = this.state
    return (
      <div className="ViewCenter container content">
        <Link className="viewAll btn" to="/admin/centers">Ver todos los centros</Link>
        <h1>{center.nombre}</h1>
        <section className="centerInfo">
          <strong>Centro de acopio:</strong> {center.nombre} <br />
          <strong>Direcci&oacute;n:</strong> {center.direccion} <br />
          <GoogleMapImage acopio={center} />
        </section>
        <section className="needsList">
          <h2>Necesidades</h2>
          <hr />
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
        </section>
      </div>
    )
  }
}

export default ViewCenter
