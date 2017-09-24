import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input'
import DocumentTitle from 'react-document-title'
import Drawer from 'rc-drawer'
import find from 'lodash/find'

import api from '../api'
import Map from '../components/Map'
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import './InfoPanel.css'
import './Map.css'

class MapScreen extends Component {
  constructor () {
    super()
    this.state = {
      collectionCenters: [],
      docked: true,
      open: true,
      transitions: true,
      touch: true,
      enableDragHandle: true,
      position: 'bottom',
      dragToggleDistance: 30,
    }
  }

  onOpenChange (open) {
    this.setState({ open })
  }

  onDock () {
    const docked = !this.state.docked
    this.setState({
      docked,
    })
    if (!docked) {
      this.onOpenChange(false)
    }
  }

  componentDidMount () {
    api.getAcopios()
      .then((result) => {
        this.setState({
          activeCenter: null,
          collectionCenters: result.data,
          totalCollectionCenters: result.data
        })
      })
  }

  goToCenter (centerId) {
    const center = find(this.state.totalCollectionCenters, { id: centerId })
    this.selectCenter(center)
  }

  selectCenter (center) {
    const component = this

    return api.getProductosByAcopioId(center.id)
      .then((products) => {
        center.products = products.data
        return api.getContactosByAcopioId(center.id)
      })
      .then((contacts) => {
      // Filter out contacts without data
        center.contacts = contacts.data.filter((contact) => {
          return find(
            ['nombre', 'telefono', 'email', 'twitter', 'facebook'],
            (field) => { return contact[field] }
          )
        })
        return component.setState({
          activeCenter: center
        })
      })
  }

  openSearch () {
    this.setState({
      activeCenter: null,
      search: true
    })
  }

  searchProduct (value) {
    const component = this
    api.getProductosByPartialName(value)
      .then(function (result) {
        const products = result.data
        console.log('Products found:', products.length)
        products.forEach((prod) => {
          const center = find(component.state.totalCollectionCenters, { id: prod.acopioId })
          if (center) {
            prod.centerName = center.nombre
          }
        })
        const centerIds = products.map((prod) => {
          return prod.acopioId
        })
        component.setState({
          collectionCenters: component.state.collectionCenters.filter((center) => {
            return centerIds.indexOf(center.id) !== -1
          }),
          productsNeeded: products
        })
      })
  }

  returnToSearch () {
    this.setState({
      activeCenter: null
    })
  }

  closeDrawer () {
    console.log('closeDrawer')
    this.setState({
      activeCenter: null
    })
  }

  render () {
    let drawer
    let products
    let contacts

    if (this.state.activeCenter) {
      const collectionCenterData = this.state.activeCenter

      products = collectionCenterData.products && collectionCenterData.products.map((prod) => {
        return <li>
          { prod.nombre }
        </li>
      })
      contacts = collectionCenterData.contacts && <div>
        <hr />
        <h3> Información de contacto </h3>
        <div className="contacts">
          { collectionCenterData.contacts.map((contact) => {
            return (
              <div>
                <ul>
                  { contact.nombre && <li><strong>Nombre:</strong> { contact.nombre } </li> }
                  { contact.telefono && <li><strong>Teléfono:</strong> { contact.telefono } </li> }
                  { contact.email && <li><strong>Email:</strong> { contact.email } </li> }
                  { contact.twitter && <li><strong>Twitter:</strong> { contact.twitter } </li> }
                  { contact.facebook && <li><strong>Facebook:</strong> { contact.facebook } </li> }
                </ul>
                <CardActions>
                  { contact.telefono && <FlatButton label="Llamar" href={'tel:' + contact.telefono.replace(/[\s-+]/g, '')} /> }
                  { contact.email && <FlatButton label="Enviar Correo" href={'mailto:' + contact.email} /> }
                  { contact.twitter && <FlatButton label="Ver Twitter" href={'https://twitter.com/' + contact.twitter} /> }
                  { contact.twitter && <FlatButton label="Ver Facebook" href={'https://facebook.com/' + contact.facebook} /> }
                </CardActions>
              </div>
            )
          })}
        </div>
      </div>
      drawer = (<div>
        <div className="pad" />
        { this.state.productsNeeded && <div className="returnToSearch" onClick={this.returnToSearch.bind(this)}>
            Regresar a resultados
        </div>
        }
        <h3>{collectionCenterData.nombre}</h3>
        <address>
          <strong>Direccion:</strong> {collectionCenterData.direccion}
        </address>
        <ul>
          {products}
        </ul>
        {contacts}
        <div className="close" onClick={this.closeDrawer.bind(this)}><span>Cerrar</span></div>
        <div className="pad" />
      </div>)
    } else if (this.state.search) {
      console.log('Rendering search')
      const prods = (this.state.productsNeeded || []).map((prod) => {
        return <div className="prodNeeded" onClick={this.goToCenter.bind(this, prod.acopioId)}>
          <span className="prodName">{ prod.nombre }</span>
          <span className="prodCenterName">{ prod.centerName }</span>
        </div>
      })
      drawer = <div>
        <div className="searchBox">
          Buscar centros que necesiten:
          <DebounceInput
            minLength={2}
            debounceTimeout={500}
            onChange={event => this.searchProduct(event.target.value)} />
        </div>
        <div className="result-list">
          { prods }
        </div>
      </div>
    } else {
      drawer = (<div>
        <h3>
          {/*
            <button onClick={ this.onDock.bind(this) }>
              {this.state.docked ? 'unpin' : 'pin'}
            </button>
          */}
          Selecciona un centro de apoyo en el mapa

          {/* Later on there will be search option here */}
        </h3>
      </div>)
    }

    const drawerProps = {
      docked: this.state.docked,
      open: this.state.open,
      touch: this.state.touch,
      enableDragHandle: this.state.enableDragHandle,
      position: this.state.position,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onOpenChange: this.onOpenChange.bind(this),
    }

    const title = `Mapa · ${process.env.REACT_APP_NAME}`

    return (
      <DocumentTitle title={title}>
        <div className="App drawer-container">
          <div className="cta">
            <span onClick={ this.centerMapOnUserLocation.bind(this) }>Cerca de mí</span>
            <span> | </span>
            <span  onClick={ this.openSearch.bind(this) }>Quiero Ayudar</span>
          </div>
          <Drawer sidebar={drawer} {...drawerProps} style={{ overflow: 'auto' }}>
            <div className="map-container">
              <Map collectionCenters={this.state.collectionCenters} onSelect={this.selectCenter.bind(this)} ref={map => this.map = map} />
            </div>
          </Drawer>
        </div>
      </DocumentTitle>
    )
  }

  centerMapOnUserLocation () {
    this.map.centerOnUserLocation()
  }
}

export default MapScreen
