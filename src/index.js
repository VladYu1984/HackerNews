import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {App} from './App';
import './index.scss';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Provider store={store}>
		<App/>
	</Provider>
);