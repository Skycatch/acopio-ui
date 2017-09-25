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
import googleMapImage from '../googleMapImage.js'
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
    this.setState(() => ({ loading: true }))

    Promise.all([api.getAcopioWithContactos(id), api.getProductosByAcopioId(id)])
      .then(([acopio, productos]) => 
        this.setState({
          center: acopio.data,
          productList: productos.data, 
          filteredProducts: productos.data,
          loading: false, 
          filter: '', 
          newProduct: '' 
        })
      )
  }
  
  onChangeFilter (evt, filter) {
    const { productList } = this.state
    const filterLength = filter.length
    const filteredProducts = filterLength === 0 
      ? productList 
      : productList.filter(({nombre}) => 
          nombre.toLowerCase().indexOf(filter.trim().toLowerCase()) > -1//busca productos que el cualquier punto contengan las letras del filtro
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

  contactos({contactos}) {
    return contactos.map((contacto, i)=> (
      <div key={i}>
        {<p><strong>Nombre:</strong> {contacto.nombre || 'No identificado'}</p>}
        {contacto.telefono && <p><strong>Teléfono:</strong> <a href={`tel:${contacto.telefono}`}>{contacto.telefono}</a></p>}
        {contacto.email &&  <p><strong>Email:</strong> <a href={`mailto:${contacto.email}`}>{contacto.email}</a></p>}
        {contacto.facebook &&  <p><strong>Facebook:</strong> <a href={`http://facebook.com/${contacto.facebook}`}>{contacto.facebook}</a></p>}
        {contacto.twitter &&  <p><strong>Twitter:</strong> <a href={`http://twitter.com/${contacto.twitter.replace('@', '')}`}>{contacto.twitter}</a></p>}
        <hr/>
      </div>
    ))
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
          {this.contactos(center)}
          {googleMapImage(center)}
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
