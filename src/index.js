import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import Layout from './components/Layout';
import Contacts from './components/contacts'

import Supply from './screens/Supply';
import Map from './screens/Map';

ReactDOM.render((
  <MuiThemeProvider>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Supply}/>
          <Route path="/map" component={Map}/>
          <Route path="/contacts" component={Contacts}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  </MuiThemeProvider>
), document.getElementById('root'));
