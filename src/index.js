import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers,compose , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import totalPriceReducer from './store/reducers/totalPrice';
import ingredientsReducer from './store/reducers/ingredients';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer=combineReducers({
  ingredients:ingredientsReducer,
  totalPrice:totalPriceReducer,
  orders:ordersReducer,
  auth:authReducer
})
const composeEnhancers = process.env.NODE_ENV ==='development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
const app = (
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>

);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
