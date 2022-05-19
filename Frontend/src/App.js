import React from "react";
// import { Router, Route } from "react-router-dom";
import { Router, Route, Switch } from "react-router-dom";

import history from './history.js'
import routes from "./routes";
import Sessionroutes from "./Sessionroutes";
import AppContext from './Authentication/AppContext'
import { AuthProvider } from './Authentication/JwtAuthentication'
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles/s&d.min.css";
import AuthGuard from './Authentication/authGuard'
export default () => (
  <AppContext.Provider value={{ routes }}>
    <Router history={history}>
      <>
        <AuthProvider>
          <Switch>
          {Sessionroutes.map((item, index) => {
                return (
                  <Route
                    key={index}
                    path={item.path}
                    component={item.component}
                    // key={index}
                    // path={route.path}
                    exact={item.exact}
                    component={() => {
                      return (
                        <item.layout >
                          <item.component />
                        </item.layout>
                      );
                    }}
                  />
                );
              }
              )}
            <AuthGuard>

              {routes.map((item, index) => {
                return (
                  <Route
                    key={index}
                    path={item.path}
                    component={item.component}
                    // key={index}
                    // path={route.path}
                    exact={item.exact}
                    component={() => {
                      return (
                        <item.layout >
                          <item.component />
                        </item.layout>
                      );
                    }}
                  />
                );
              }
              )}
            </AuthGuard>
          </Switch>

        </AuthProvider>
      </>

    </Router>
  </AppContext.Provider>
);
