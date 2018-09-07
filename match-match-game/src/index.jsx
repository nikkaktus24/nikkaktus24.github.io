import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './utils/configureStore'
import App from './containers/App';
import mainstyle from './styles/main';
import { BrowserRouter, browserHistory } from 'react-router-dom'
import { syncHistoryWithStore } from 'react-router-redux'
const root = document.querySelector("#root");

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  root
);
