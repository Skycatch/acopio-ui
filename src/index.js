import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Contacts from './components/contacts'

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  <MuiThemeProvider>
    <Contacts />
  </MuiThemeProvider>
  , document.getElementById('root')
);
registerServiceWorker();
