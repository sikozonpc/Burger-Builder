import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ingredientsReducer from "./store/reducers/ingredients.reducer";

import './index.css';
import App from "./App";
import * as serviceWorker from './serviceWorker';


// Creates Redux Reducer
const rootReducer = ingredientsReducer;

// Creates Redux Store
const store = createStore( rootReducer );

// Subscription
store.subscribe( () => console.log("[Subscritpion]: ", store.getState()) );


// Setting up the router on the root file
const app = (
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
