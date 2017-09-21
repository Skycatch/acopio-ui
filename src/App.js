import React, { Component } from 'react';
import api from './api';
import './App.css';
import Map from './components/map/Map';

class App extends Component {

  constructor () {

    super();
    this.state = {
      collectionCenters: [],
    };
  }

  componentDidMount () {

    api.getAcopios()
    .then((result) => {

      this.setState({
        collectionCenters: result.data
      });
    });
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h1 className="title left">Sismo MX</h1>
          <h1 className="title">Información del centro de acopio</h1>
        </div>
        <Map collectionCenters={ this.state.collectionCenters }></Map>
      </div>
    );
  }
}

export default App;
