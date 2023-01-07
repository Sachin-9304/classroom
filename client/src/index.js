import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider as UserProvider} from "./context/UserContext"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserProvider>
);
