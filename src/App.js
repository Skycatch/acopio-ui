import React, { Component } from 'react';
import './App.css';
import Map from './components/map/Map';
import Where from 'node-where';

class App extends Component {

  constructor () {

    super();
    this.state = {
      gatheringCenters: [],
    };
  }

  componentDidMount () {
    fetch(`http://localhost:3000/acopios.json`)
    .then((result) => {
      return result.json();
    })
    .then((centers) => {
      const transformed = [];
      return Promise.all(centers.map((center) => {
        console.log('Converting', { center });
        Where.is(center.direccionCentroDeAcopio, (err, result) => {
          if (err) {
            console.error('ERROR PARSING ADDRESS:', center.direccionCentroDeAcopio);
            return center;
          }
          console.log('Geoloc result:', result, result.get('lat'), result.get('lng'));
          transformed.push(Object.assign(center, {
            lat: result.get('lat'),
            lng: result.get('lng')
          }));
        });
      }))
      .then(() => {
        return transformed;
      });
    })
    .then((centers) => {
      console.log('CENTERS ARE::', centers);
      this.setState({
        gatheringCenters: centers
      });
    });
  }

  render () {
    console.log('this.state APP', this.state);
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="title left">Sismo MX</h1>
          <h1 className="title">Información del centro de acopio</h1>
        </div>
        <Map centers={this.state.gatheringCenters}></Map>
      </div>
    );
  }
}

export default App;
