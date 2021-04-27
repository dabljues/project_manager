/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useToken from "./useToken";

const PrivateRoute = ({ component, ...rest }: any) => {
  const Component = component;
  const { token, setToken } = useToken();
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
