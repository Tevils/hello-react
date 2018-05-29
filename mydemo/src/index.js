import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Records from './components/Records.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Records />, document.getElementById('root'));
registerServiceWorker();
