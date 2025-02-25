import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';
import {store} from "./app/store";
import {Provider} from "react-redux";
import {App} from "./app/App";
import {AppHttpRequests} from "./app/AppHttpRequests";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        {/*<App/>*/}
        <AppHttpRequests/>
    </Provider>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();