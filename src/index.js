import {React} from 'react';
import ReactDOM from 'react-dom/client';
import './header.css';
import './body-component.css';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <App />
    </>
);

