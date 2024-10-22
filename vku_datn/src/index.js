import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import store from './redux/store'
import {Provider} from "react-redux"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Provider store={store}>
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnHover = {false}
          />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

Kommunicate.init("2e4f73e41402f5d36ce30c63dff85442e", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true
});

export default App;