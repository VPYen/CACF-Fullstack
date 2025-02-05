// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import App from './App';

// Assets
import './assets/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title= "Chi Alpha: Christian Fellowship";
root.render(
  <React.StrictMode>
    <Router>
        <App/>
    </Router>  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
