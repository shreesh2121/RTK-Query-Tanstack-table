/* eslint-disable @typescript-eslint/no-unused-vars */

import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { Store } from './ReduxQuery/Store';
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

