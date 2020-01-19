import React, { Component } from "react";
import {
  getAllEvents,
  createGraphDataForEvents,
  getAllUsers
} from "../helpers";
import moment from "moment";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

class Admin extends Component {
  state = {
    data: [],
    userData: [],
    users: [],
    selectedUser: null,
    toggleDropdown: false
  };
  componentDidMount = () => {
    getAllUsers(users => {
      this.setState({
        users: users
      });
    });
    getAllEvents(result => {
      let data = createGraphDataForEvents(
        moment({ year: 1970 }),
        moment({ year: 2099 }),
        result
      );
      this.setState({
        data: data
      });
    });
  };
  render() {
    if (this.state.selectedUser)
      getAllEvents(
        result => {
          let data = createGraphDataForEvents(
            moment({ year: 1970 }),
            moment({ year: 2099 }),
            result,
            this.state.selectedUser.id
          );
          this.setState({
            userData: data
          });
        },
        err => console.log("error from getAllE", err)
      );
    return (
      <div>
        <div className={"container has-padding-top-50"}>
          <div className={"columns"}>
            <div className={"column"}>
              <div className={"box"}>
                <LineChart width={900} height={300} data={this.state.data}>
                  <XAxis dataKey={"date"}></XAxis>
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#ff4f42"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
                <hr />
                <h1 className={"is-4"}>All events</h1>
              </div>
            </div>
          </div>
          <div className={"columns"}>
            <div className={"column is-two-thirds"}>
              <div className={"box"}>
                <span className={"is-4"}>Weekly use by user</span>

                <hr />
                <LineChart width={600} height={200} data={this.state.userData}>
                  <XAxis dataKey={"date"}></XAxis>
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#49a8e3"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </div>
            </div>

            <div className={"column "}>
              <div className={"box"}>
                <span className={"is-4"}>Select user</span>
                <hr />
                <div
                  className={`dropdown ${
                    this.state.toggleDropdown ? "is-active" : ""
                  }`}
                >
                  <div class="dropdown-trigger">
                    <button
                      onClick={() => {
                        this.setState({
                          toggleDropdown: !this.state.toggleDropdown
                        });
                      }}
                      class="button"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                    >
                      <span>
                        {this.state.selectedUser
                          ? this.state.selectedUser.username
                          : "Select a user"}
                      </span>
                      <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      {this.state.users.map(user => {
                        return (
                          <a
                            className={"dropdown-item"}
                            onClick={() => {
                              this.setState({
                                selectedUser: user,
                                toggleDropdown: !this.state.toggleDropdown
                              });
                            }}
                          >
                            {user.username}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
