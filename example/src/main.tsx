import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { filter } from '../../src';

console.log(filter);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
