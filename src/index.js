import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/Router';
import './styles/index.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers/index';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(middleware)
);

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={ history }>
        <App />
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root')
);