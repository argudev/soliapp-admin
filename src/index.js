import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PermissionsProvider } from 'context/permission';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/soliapp.scss";
import 'sweetalert2/dist/sweetalert2.min.css';
import 'leaflet/dist/leaflet.css';

import App from "app";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <PermissionsProvider>
      <App />
    </PermissionsProvider>
  </BrowserRouter>
);
