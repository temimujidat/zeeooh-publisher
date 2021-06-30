import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/scss/forms/_floating-labels.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import { StylesProvider } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <CssBaseline />
        <StylesProvider injectFirst>
          <App />
        </StylesProvider>
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// password: Joi.string()
//         .pattern(new RegExp('')),
