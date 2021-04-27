/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import getToken from "./useToken";

const PrivateRoute = ({ component, ...rest }: any) => {
  const token = getToken();
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
