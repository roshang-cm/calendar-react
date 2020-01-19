import React from "react";
import { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated() === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
