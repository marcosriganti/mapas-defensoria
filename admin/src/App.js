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
import UsersPage from "./pages/users";

import PointsPage from "./pages/points";
import PointsImportPage from "./pages/points/import";
import PointsAddPage from "./pages/points/new";
import PointsEditPage from "./pages/points/edit";

import CategoriesPage from "./pages/categories";
import CategoriesAddPage from "./pages/categories/new";
import CategoriesEditPage from "./pages/categories/edit";
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
          <Route path="/users" exact>
            <UsersPage />
          </Route>
          <Route path="/points" exact>
            <PointsPage />
          </Route>
          <Route path="/points/import" exact>
            <PointsImportPage />
          </Route>
          <Route path="/points/new" exact>
            <PointsAddPage />
          </Route>
          <Route path="/points/edit/:id" exact>
            <PointsEditPage />
          </Route>
          <Route path="/categories" exact>
            <CategoriesPage />
          </Route>
          <Route path="/categories/new" exact>
            <CategoriesAddPage />
          </Route>
          <Route path="/categories/edit/:id" exact>
            <CategoriesEditPage />
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
