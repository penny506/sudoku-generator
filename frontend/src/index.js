import React from 'react';
import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PrimeReactProvider value={{ unstyled: false }}><App /></PrimeReactProvider>);
