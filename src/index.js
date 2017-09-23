import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import Layout from './components/Layout';

import Supply from './screens/Supply';
import Map from './screens/Map';

ReactDOM.render((
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Supply}/>
        <Route path="/map" component={Map}/>
      </Switch>
    </Layout>
  </BrowserRouter>
), document.getElementById('root'));
