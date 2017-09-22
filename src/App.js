import React, { Component } from 'react';
// import api from './api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
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
