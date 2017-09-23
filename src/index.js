import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import PositionManager from './components/PositionManager'
import GeolocationPermissionToolbar from './components/GeolocationPermissionToolbar'

import './index.css'
import Layout from './components/Layout'
import Contacts from './components/contacts'

import Supply from './screens/Supply'
import Map from './screens/Map'
import List from './screens/List'
import CenterAdmin from './screens/CenterAdmin'

ReactDOM.render((
  <MuiThemeProvider>
    <BrowserRouter>
      <PositionManager>
        {requestPosition => (
          <div className="App">
            <GeolocationPermissionToolbar onClick={requestPosition} />
            <Layout>
              <Switch>
                <Route exact path="/" component={Supply} />
                <Route path="/map" component={Map} />
                <Route path="/list" component={List} />
                <Route path="/control/:id" component={CenterAdmin} />
                <Route path="/contacts" component={Contacts} />
              </Switch>
            </Layout>
          </div>
        )}
      </PositionManager>
    </BrowserRouter>
  </MuiThemeProvider>
), document.getElementById('root'))
