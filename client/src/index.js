
//import main things
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import route components
import {BrowserRouter} from 'react-router-dom'

//import reactstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import cookies
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
