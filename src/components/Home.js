import React, { Component, useImperativeHandle } from "react";
import Calendar from "react-calendar";
import "./helpers";
import { getUserFromLocalStorage } from "./helpers";
import Events from "./Events";
class Home extends Component {
  onDateChanged = date => {
    console.log(date);
    this.setState({
      date
    });
  };
  componentWillMount = () => {
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
            <h1 className="navbar-item title is-4 has-text-primary">
              Calendar Events App
            </h1>
          </div>
          <div className={"navbar-end"}>
            <div className={"navbar-item"}>
              <div class="dropdown">
                <div class="dropdown-trigger">
                  <button
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
                <div class="dropdown-menu" id="dropdown-menu3" role="menu">
                  <div class="dropdown-content">
                    {/* <Link href="#" class="dropdown-item">
                      Log Out
                    </L> */}
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
