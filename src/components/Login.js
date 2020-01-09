import React, { Component } from "react";
// const axios = require("axios");
import axios from "axios";
class Login extends Component {
  state = {
    username: "",
    password: "",
    loading: false
  };
  performLogin = () => {
    this.setState({ loading: true });
    // fetch(')
    axios
      .get("http://localhost:4000/login", {
        params: {
          username: this.state.username,
          password_hash: this.state.password
        }
      })
      .then(result => {
        this.setState({ loading: false });
        localStorage.setItem("user", JSON.stringify(result.data));
        window.location.replace("/");
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  handleChanges = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  handleSubmitClicked = event => {
    event.preventDefault();
    this.performLogin();
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="columns">
            <div class="column"></div>
            <div className="column is-half">
              <input
                type="text"
                name="username"
                className="input"
                placeholder="Username"
                onChange={this.handleChanges}
              />
              <input
                type="text"
                name="password"
                className="input"
                placeholder="Password"
                onChange={this.handleChanges}
              />
              <div className="level">
                <div className="level-left">
                  <button className="button">New User?</button>
                </div>
                <div className="level-right">
                  <button
                    className={`button is-primary ${
                      this.state.loading ? "is-loading" : ""
                    }`}
                    onClick={this.handleSubmitClicked}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div class="column"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
