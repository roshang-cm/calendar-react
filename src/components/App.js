import React, { Component } from "react";
import "bulma";
import "bulma-helpers/css/bulma-helpers.min.css";
import "../App.sass";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </BrowserRouter>
    );
  }
}

export default App;
