import React from "react";
import { Provider } from "react-redux";
import createStore from "./store/store";
import { Switch, BrowserRouter, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import ProtectedRoute from "./routing/ProtectedRoute";
import "./App.css";
import DefaultLayout from "./containers/PrivateLayouts/TheLayout";
import Login from "./views/Pages/PublicPages/Login/Login";
import ThirdPartyLogin from "./views/Pages/PublicPages/ThirdPartyLogin";
import ReduxToastr from "react-redux-toastr";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const store = createStore;
const App = () => {
  return (
    <Provider store={store}>
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
        />
        <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/callback" component={ThirdPartyLogin} />
              <ProtectedRoute path="/" component={DefaultLayout} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>

    </Provider>
  );
};

export default App;
