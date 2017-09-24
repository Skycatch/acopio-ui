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
import './admin.css'
import './ViewCenter.css'

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY 

const serial = fn =>
  fn.reduce((promise, fn) =>
    promise.then(result => fn().then(Array.prototype.concat.bind(result))),
  Promise.resolve([]))

class AdminViewCenter extends Component {
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
    const product = api.getProductosByAcopioId(id).then(({data: productList}) => {
      this.setState(() => ({ productList, filteredProducts: productList }))
    })
    this.setState(() => ({ loading: true }))
    api.getAcopio(id).then(result => {
      this.setState({center: result.data})
    })
    product.then(() => {
      this.setState(() => ({ loading: false, filter: '', newProduct: '' }))
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

  map(center) {
    if (!center || !center.geopos) { return null}
    const latLng = `${center.geopos.lat}%2C${center.geopos.lng}`

    const gmapsLink =`https://www.google.com/maps/search/?api=1&query=${latLng}`

    const imgSrc = 'https://maps.googleapis.com/maps/api/staticmap'+
      `?center=${latLng}`+
      `&markers=color:red%7C${latLng}`+
      '&zoom=15&size=400x350'+
      '&maptype=roadmap'+
      `&key=${googleMapsApiKey}`
      
    return <a href={gmapsLink} target="_blank"><img src={imgSrc} alt="mapa del centro de acopio" style={{maxWidth: 100+'%'}}/></a>
  }

  render () {
    const { newProduct, filteredProducts, filter, selected, center } = this.state
    return this.state.loading ? <div className="container"><h1>Loading</h1></div> : (
      <div className="ViewCenter container content">
        <Link className="viewAll btn" to="/admin/centers">Ver todos los centros</Link>
        <h1>{center.nombre}</h1>
        <section className="centerInfo">
          <strong>Centro de acopio:</strong> {center.nombre} <br />
          <strong>Direcci&oacute;n:</strong> {center.direccion} <br />
          {this.map(center)}
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
          <Table multiSelectable onRowSelection={this.onRowSelection} >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Nombre</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map(({ nombre, id }, index) => (
                <TableRow key={`product-${id}`} selected={selected.indexOf(index) !== -1}>
                  <TableRowColumn>{nombre}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <RaisedButton label="Borrar Necesidades" secondary onClick={this.onDelete} />
        </section>
      </div>
    )
  }
}

export default AdminViewCenter
