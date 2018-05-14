import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HomeView from './HomeView';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HomeView />, document.getElementById('root'));
registerServiceWorker();
