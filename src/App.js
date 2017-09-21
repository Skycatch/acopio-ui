import React, { Component } from 'react';
import api from './api';
import './App.css';
import Map from './components/map/Map';
import Where from 'node-where';

class App extends Component {

  constructor () {

    super();
    this.state = {
      // this.testApi(); // This should be uncommented only in local testing!!!S!!
      gatheringCenters: [],
    };
  }

  componentDidMount () {

    // Use this block with dummy testing -----
    fetch(`http://localhost:3000/acopios.json`)
    .then((result) => {
      console.log('===> result', result);
      return result.json();
    })
    // ----------

    // api.getAcopios()
    // .then((result) => {
    //   console.log('===> result', result);
    //   return result.data;
    // })
    .then((centers) => {
      // const transformed = [];
      // return Promise.all(centers.map((center) => {
      //   console.log('Converting', { center });
      //   Where.is(center.direccionCentroDeAcopio, (err, result) => {
      //     if (err) {
      //       console.error('ERROR PARSING ADDRESS:', center.direccionCentroDeAcopio);
      //       return center;
      //     }
      //     console.log('Geoloc result:', result, result.get('lat'), result.get('lng'));
      //     transformed.push(Object.assign(center, {
      //       lat: result.get('lat'),
      //       lng: result.get('lng')
      //     }));
      //   });
      // }))
      // .then(() => {
      //   return transformed;
      // });
      // return centers.json();
      return centers;
    })
    .then((centers) => {
      console.log('CENTERS ARE::', centers);
      this.setState({
        gatheringCenters: centers
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">Acopio</div>
        <div className="App-header">
          <h1 className="title left">Sismo MX</h1>
          <h1 className="title">Información del centro de acopio</h1>
        </div>
        <Map></Map>
      </div>
    );
  }

  testApi() {
    try {
      api.getAcopios();

      api.getProductos('1');

      api.postAcopio({});
      api.postProducto({});

      api.postResponsable({});

      api.updateAcopio('1', {});
      api.updateProducto('1', {});
      api.updateResponsable('1', {});

      api.deleteAcopio('1');
      api.deleteProducto('1');
      api.deleteResponsable('1');
    } catch (error) {
      console.log(error);
    }
  }

}

export default App;
