import React, { useState } from "react";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import createStore from "./store/store";
// import "../public/css/style.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import ProtectedRoute from "./routing/ProtectedRoute";
import "./App.css";
import DnsSetting from "./views/Pages/PrivatePages/DnsSetting";
import DefaultLayout from "./containers/PrivateLayouts/TheLayout";
import Login from "./views/Pages/PublicPages/Login/Login";
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const store = createStore;
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route path="/login" component={Login} />

            <ProtectedRoute path="/" component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
