import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "bulma";
import "bulma-helpers/css/bulma-helpers.min.css";
import "../App.sass";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import { PrivateRoute } from "./PrivateRoute";
import Admin from "./Admin";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }
  componentWillMount = () => {
    this.setState({
      authenticated: localStorage.getItem("user") ? true : false
    });
  };
  render() {
    return (
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute
          exact
          path="/"
          component={Home}
          fallbackRoute={"/login"}
          authenticated={() => {
            return localStorage.getItem("user") ? true : false;
          }}
        />
        <PrivateRoute
          path="/admin"
          component={Admin}
          fallbackRoute={"/"}
          authenticated={() => {
            let user = localStorage.getItem("user");
            if (user) {
              user = JSON.parse(user);
              if (user.read && user.write && user.delete) {
                return true;
              }
            }
            return false;
          }}
        />
      </BrowserRouter>
    );
  }
}

export default App;
