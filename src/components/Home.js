import React, { Component, useImperativeHandle } from "react";
import Calendar from "react-calendar";
import { getUserFromLocalStorage } from "../helpers";
import Events from "./Events";
import { Link } from "react-router-dom";
class Home extends Component {
  state = {
    dropDownCollapse: false
  };
  onDateChanged = date => {
    console.log(date);
    this.setState({
      date
    });
  };
  componentWillMount = () => {
    console.log("Entered HomePage");
    console.log(getUserFromLocalStorage());
    if (getUserFromLocalStorage()) {
      this.setState({
        date: new Date(),
        user: getUserFromLocalStorage()
      });
    } else {
      window.location.replace("/login");
    }
  };
  render() {
    return (
      <div className="container">
        <header className=" navbar">
          <div className="navbar-brand">
            <h1 className="navbar-item title is-4 has-text-primary has-margin-left-10">
              Calendar Events App
            </h1>
          </div>
          <div className={"navbar-end"}>
            <div className={"navbar-item"}>
              <span
                class="tag is-dark has-margin-right-20"
                title={`Can${this.state.user.read ? "" : "not"} read, Can${
                  this.state.user.write ? "" : "not"
                } write, Can${this.state.user.delete ? "" : "not"} delete. `}
              >
                {this.state.user.role_name}
              </span>
              <div
                className={`dropdown ${
                  this.state.dropDownCollapse ? "is-active" : ""
                }`}
              >
                <div class="dropdown-trigger">
                  <button
                    onClick={() =>
                      this.setState({
                        dropDownCollapse: !this.state.dropDownCollapse
                      })
                    }
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu3"
                  >
                    <span>Hi, {this.state.user.username}</span>
                    <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div
                  className={`dropdown-menu`}
                  id="dropdown-menu3"
                  role="menu"
                >
                  <div class="dropdown-content">
                    <a
                      onClick={() => {
                        localStorage.clear();
                        window.location.replace("/");
                      }}
                      href="#"
                      class="dropdown-item"
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className={"columns"}>
            <div className={"column is-one-third"}>
              <div className={"section"}>
                <Calendar
                  value={this.state.date}
                  onChange={this.onDateChanged}
                />
                <div className={"box has-margin-top-20"}>
                  <h2 className={"is-4"}>Weekly progress</h2>
                  <hr />
                </div>
              </div>
            </div>
            <div className={"column"}>
              <div className={"section"}>
                <Events key={this.state.date} date={this.state.date} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Home;
