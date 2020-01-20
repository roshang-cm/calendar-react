import React, { Component } from "react";
import {
  api,
  createGraphDataForEvents,
  getAllUsers,
  getUserFromLocalStorage,
  filterEventsByDate
} from "../methods";
import moment from "moment";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

class Admin extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userData: [],
      users: [],
      roles: [],
      selectedUser: null,
      selectedRoleOption: null,
      toggleDropdown: false,
      isLoading: false,
      user: JSON.parse(localStorage.getItem("user"))
    };
  }
  componentDidMount = async () => {
    let usersListResult = await api.getAllUsers(this.state.user.jwt);
    this.setState({
      users: usersListResult
    });

    let eventsListResult = await api.getAllEvents(this.state.user.jwt);
    let data = createGraphDataForEvents(
      moment({ year: 1970 }),
      moment({ year: 2099 }),
      eventsListResult
    );
    let rolesListResult = await api.getAllRoles(this.state.user.jwt);

    this.setState({
      data: data,
      roles: rolesListResult
    });
  };

  updateRole = async () => {
    let adminCount = this.state.users.filter(
      user => user.read && user.write && user.delete
    ).length;
    console.log("No. of admins ", adminCount);
    if (
      adminCount < 2 &&
      this.state.selectedUser.read &&
      this.state.selectedUser.write &&
      this.state.selectedUser.delete
    ) {
      alert(
        "There are no other admins. Make sure there is another admin before demoting this admin user."
      );
      return;
    }
    let result = await api.updateRole(
      this.state.user.jwt,
      this.state.selectedUser.id,
      this.state.selectedRoleOption
    );
    let usersListResult = await api.getAllUsers(this.state.user.jwt);
    this.setState({
      users: usersListResult,
      selectedUser: null,
      selectedRoleOption: null
    });
  };

  renderManageUserSectionEmpty() {
    return (
      <div className={"box"}>
        <div className={"container"}>
          <i>No user selected. Select a user to manage their account.</i>
        </div>
      </div>
    );
  }
  renderManageUserSection() {
    return (
      <div className={"box"}>
        <span className={"is-4"}>
          Manage User <b>{this.state.selectedUser.username}</b>
        </span>

        <hr />
        <span>Update account type:</span>
        {this.state.roles.map(role => {
          return (
            <div>
              <input
                key={role.role_id}
                type="radio"
                name="roles"
                value={role.role_id}
                checked={this.state.selectedRoleOption === role.role_id}
                onChange={() => {
                  this.setState({
                    selectedRoleOption: role.role_id
                  });
                }}
              />
              <span> {role.role_name}</span>
            </div>
          );
        })}
        <br />
        {this.state.selectedRoleOption != this.state.selectedUser.role_id ? (
          <button className={"button is-primary"} onClick={this.updateRole}>
            Save Changes
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
  render() {
    if (this.state.selectedUser)
      api.getAllEvents(
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
              {this.state.selectedUser
                ? this.renderManageUserSection()
                : this.renderManageUserSectionEmpty()}
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
                                selectedRoleOption: user.role_id,
                                toggleDropdown: !this.state.toggleDropdown
                              });
                              console.log(user);
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
