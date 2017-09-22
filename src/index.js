import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Supply from './components/Supply'
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Switch, Route } from 'react-router-dom'


ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/supply' component={Supply}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))


// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

