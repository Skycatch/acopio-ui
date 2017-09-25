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
import googleMapImage from '../googleMapImage.js'
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
          nombre.toLowerCase().indexOf(filter.trim().toLowerCase()) > -1//busca productos que en cualquier punto contengan el texto ingresado en el input i.e "be" puede encontrar alimento para bebé y panhales para bebé
      )
    this.setState(() => ({ filteredProducts, filter }))
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
        <Link className="viewAll btn" to="/acopios">Ver todos los centros</Link>
        <h1>{center.nombre}</h1>
        <section className="centerInfo">
          <strong>Centro de acopio:</strong> {center.nombre} <br/>
          <strong>Direcci&oacute;n:</strong> {center.direccion} <br/>
          {this.contactos(center)}
          {googleMapImage(center)}
        </section>
        <section className="needsList">
          <h2>Necesidades</h2>
          <hr/>
          <br/>
          <TextField
            hintText="Buscar un producto"
            value={filter}
            onChange={this.onChangeFilter}
          />
          <br/>
          <br/>
          <Table >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Producto</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {filteredProducts.map(({ nombre, id }, index) =>
                (<TableRow key={id}>
                  <TableRowColumn>{nombre}</TableRowColumn>
                </TableRow>)
              )}
            </TableBody>
          </Table>
        </section>
      </div>
    )
  }
}

export default ViewCenter;
