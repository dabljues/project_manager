/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getAccessToken } from "../../hooks/useToken";

const PrivateRoute = ({ component, ...rest }: any) => {
  const token = getAccessToken();
  const isAuthenticated = token != null;
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
