import React from 'react';
import ReactDOM from 'react-dom';
import Router from './ipretty/core/router/Router';
import "../src/ipretty/styles/home.css"
import "../src/ipretty/styles/reset.css"
import 'bootstrap/dist/css/bootstrap.css';
import i18n from 'ipretty/translation/i18n';
import { I18nextProvider } from 'react-i18next';

const App = (Router);
// window.io = require('socket.io-client');

ReactDOM.render(
    <>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </>,
    document.querySelector("#root")
);