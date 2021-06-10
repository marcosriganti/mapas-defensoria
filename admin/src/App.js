import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ProvideAuth, useAuth } from "./components/Auth";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import CategoriesPage from "./pages/Categories";

import "./App.css";

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <HomePage />
          </PrivateRoute>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/categories" exact>
            <CategoriesPage />
          </Route>
          {/* <Route exact path="/me/:profile">
            <PublicProfile />
          </Route> */}
          <Route path="*">
            <h1>404</h1>
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
