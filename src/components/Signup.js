import React, { Component } from "react";

const axios = require("axios");

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: "",
      password: "",
      confirmPassword: ""
    };
  }
  handleChanges = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };
  handleSignUpClicked = () => {
    let passwordsMatch = false;
    if (this.state.password == this.state.confirmPassword) {
      passwordsMatch = true;
    }
    if (passwordsMatch) {
      this.performSignUp();
      return;
    }
    alert("The passwords do not match");
  };

  performSignUp = () => {
    axios
      .post("http://localhost:4000/signup", {
        username: this.state.username,
        password_hash: this.state.password
      })
      .then(result => {
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.data));
        window.location.replace("/");
      })
      .catch(err => {
        console.error(err.response);
        alert(err.response);
      });
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

              <input
                type="text"
                name="confirmPassword"
                className="input"
                placeholder="Confirm Password"
                onChange={this.handleChanges}
              />
              <div className="level">
                <div className="level-left">
                  <button className="button">Already a user?</button>
                </div>
                <div className="level-right">
                  <button
                    className="button is-primary"
                    onClick={this.handleSignUpClicked}
                  >
                    Sign Up
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

export default Signup;
