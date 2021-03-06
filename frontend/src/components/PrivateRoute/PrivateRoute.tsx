/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect, Route } from "react-router-dom";

import { isAuthenticated, refreshTokenExpired } from "../../api/auth";

const PrivateRoute = ({ component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated() && !refreshTokenExpired() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
