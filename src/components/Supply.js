import React, { Component } from 'react'
import Header  from './Header';
// import Map from './map/Map';
import api from '../api';

class Supply extends Component {


  constructor(props) {

    super(props);
    this.state = {
      centers: [],
      currentLocation: null,
      loadedProducts: false
    }
    this.getNearbyCenters();

  }

  getCurrentPosition(center) {
    navigator.geolocation.getCurrentPosition(position => {
      center([position.coords.longitude, position.coords.latitude])
    });
  }

  getNearbyCenters(centers) {
    const parent = this
    this.getCurrentPosition(function(position) {
      position = position.reverse()
      const filter = {
        where: {
          geopos: {
            near: position,
            maxDistance: 20,
            unit: 'kilometers'
          }
        }
      }
      api.getAcopiosWhere(JSON.stringify(filter))
        .then(({ data }) => {
          parent.setState({ 
            centers: data, 
            currentLocation: position
          })
          parent.getProducts(data)

        })
        .catch(err => err);
    })
  }

  getProducts(data) {
    const parent = this
    const center_ids = data.map(function(d) {
      return { "acopioId": d.id }
    })

    const filter = {"or":center_ids}

    api.getProductosWhere(JSON.stringify(filter))
    .then(({ data }) => {

      const products = data.reduce(function(center, d) {
        if(!center[d["acopioId"]]) {
          center[d["acopioId"]] = []
        }
        center[d["acopioId"]].push({ 
          fechaDeActualizacion: d["fechaDeActualizacion"], 
          nombre: d["nombre"], id: d["id"] 
        })
        return center

      }, {})

      parent.setState({ 
        products: products,
        loadedProducts: true 
      })
    })
    
  }

  getDistance(pos1,pos2) {
    var R = 6371e3; // metres
    var phi1 = pos1[0] * (Math.PI/180);
    var phi2 = pos2[0] * (Math.PI/180);
    var delta_phi = (pos2[0]-pos1[0]) * (Math.PI/180);
    var delta_lambda = (pos2[1]-pos1[1]) * (Math.PI/180);

    var a = Math.sin(delta_phi/2) * Math.sin(delta_phi/2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(delta_lambda/2) * Math.sin(delta_lambda/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return Math.round((R * c) / 1000, 2);
  }


  render() {
    const parent = this
    if(this.state.loadedProducts) {
      const centers = this.state.centers.map(function(c) {
        let prods = '';
        if(parent.state.products[c.id]) {
          prods = parent.state.products[c.id].map(function(p){
            return <li key={p.id} data-date={p.fechaDeActualizacion}>{p.nombre}</li>
          })

          const distance = parent.getDistance(
            [c.geopos.lat, c.geopos.lng], 
            [parent.state.currentLocation[0], parent.state.currentLocation[1]]
          )
          return <li key={c.id}>
            {c.nombre} (a {distance} km)
            <ul>
              {prods}
            </ul>
          </li>

        } else {
          return null
        }

      })
      return (
        <div>
          <Header />
          <h1>¿Que se necesita cerca de ti?</h1>
          <ul>
            {centers}
          </ul>
        </div>
      )
    } else {
      return (<div><Header />cargando</div>)
    }
  }

}

export default Supply