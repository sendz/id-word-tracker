import createBrowserHistory from 'history/createBrowserHistory';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { INJECT_KEY } from './constants';
import './index.css';
import App from './App';
import { Kateglo } from './services/KategloService';

configure({ enforceActions: 'always' });

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

const stores = {
  [INJECT_KEY.ROUTING]: routingStore,
  [INJECT_KEY.KATEGLO]: Kateglo
};

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
