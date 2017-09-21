import React, { Component } from 'react';
import api from './api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.testApi();

    this.state = { date: new Date() };
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
  render() {
    return (
      <div className="App">
        <div className="App-header">Acopio</div>
      </div>
    );
  }
}

export default App;
