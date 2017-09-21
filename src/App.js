import React, { Component } from 'react';
import './App.css';
import Map from './components/map/Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="title left">Sismo MX</h1>
          <h1 className="title">Información del centro de acopio</h1>
        </div>
        <Map></Map>
      </div>
    );
  }
}

export default App;
