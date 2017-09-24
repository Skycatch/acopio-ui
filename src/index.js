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
import AdminCenters from './components/admin/AdminCenters'
import AdminViewCenter from './components/admin/AdminViewCenter'
import AdminAddCenter from './components/admin/AdminAddCenter'
import CenterSearch from './screens/CenterSearch'

ReactDOM.render((
  <MuiThemeProvider>
    <BrowserRouter>
      <PositionManager>
        {requestPosition => (
          <div className="App">
            <Layout>
              <Switch>
                <Route exact path="/" component={Supply} />
                <Route path="/map" component={Map} />
                <Route path="/list" component={List} />
                <Route path="/centers/search" component={CenterSearch} />
                <Route path="/contacts" component={Contacts} />
                <Route exact path="/admin/centers" component={AdminCenters} />
                <Route path="/admin/centers/view/:id" component={AdminViewCenter} />
                <Route path="/admin/centers/addnew" component={AdminAddCenter} />
              </Switch>
            </Layout>
            <GeolocationPermissionToolbar onClick={requestPosition}
              style={{position: 'fixed', bottom: 0}} />

          </div>
        )}
      </PositionManager>
    </BrowserRouter>
  </MuiThemeProvider>
), document.getElementById('root'))
