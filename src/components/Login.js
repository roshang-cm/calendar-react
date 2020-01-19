import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
class Login extends Component {
  state = {
    username: "",
    password: "",
    loading: false,
    redirectToHome: false
  };
  performLogin = () => {
    this.setState({ redirectToHome: false, loading: true });
    axios
      .get("http://localhost:4000/login", {
        params: {
          username: this.state.username,
          password: this.state.password
        }
      })
      .then(result => {
        localStorage.setItem("user", JSON.stringify(result.data));
        console.log("Login successful");
        this.setState({ loading: false, redirectToHome: false });
        this.props.history.push("/");
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
    if (this.state.redirectToHome === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div className="container">
          <div className="columns">
            <div class="column"></div>
            <div className="column is-half">
              <div className={"box"}>
                <h1 className={"title has-text-info"}>Login</h1>
                <input
                  type="text"
                  name="username"
                  className="input has-margin-bottom-10"
                  placeholder="Username"
                  onChange={this.handleChanges}
                />
                <input
                  type="password"
                  name="password"
                  className="input has-margin-bottom-10"
                  placeholder="Password"
                  onChange={this.handleChanges}
                />
                <div className="level">
                  <div className="level-left">
                    <button
                      className="button"
                      onClick={() => window.location.replace("/signup")}
                    >
                      New User?
                    </button>
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
            </div>
            <div class="column"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
