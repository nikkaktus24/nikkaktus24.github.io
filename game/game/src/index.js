import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './utils/configureStore'
import App from './containers/App';
import mainstyle from './styles/mainstyle.scss';
const root = document.querySelector("#root");

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
