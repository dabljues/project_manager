/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { UserContext } from "../../shared/interfaces";

const PrivateRoute = ({ component, ...rest }: any) => {
  const { user } = useContext(UserContext);
  const isAuthenticated = user.id !== 0;
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default PrivateRoute;
