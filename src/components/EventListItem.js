import React, { Component } from "react";

class EventListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user"))
    };
  }
  render() {
    return (
      <article class="message">
        <div className={`message-header`}>
          <p className={`${this.props.event.completed ? "is-striked" : ""}`}>
            {this.props.event.title}
          </p>
          <div className={"level"}>
            {//Showing option only if privilege to delete
            this.state.user.delete ? (
              <span
                class="icon has-text-danger has-margin-right-10 icon-button"
                onClick={() => this.props.onDeleteClicked(this.props.event)}
              >
                <i class="fas fa-trash"></i>
              </span>
            ) : (
              ""
            )}
            {//Ditto
            this.state.user.write ? (
              <span
                class="icon has-text-white has-margin-right-10 icon-button"
                onClick={() => this.props.onEditClicked(this.props.event)}
              >
                <i class="fas fa-edit"></i>
              </span>
            ) : (
              ""
            )}

            {this.props.event.completed ? (
              ""
            ) : (
              <button
                disabled={!this.state.user.write}
                title={
                  !this.state.user.write ? "You do not have edit access" : ""
                }
                class="button is-small is-success is-rounded"
                aria-label="delete"
                onClick={() =>
                  this.props.onMarkAsCompleteClicked(this.props.event)
                }
              >
                Mark as completed
              </button>
            )}
          </div>
        </div>
        <div
          className={`message-body ${
            this.props.event.completed ? "is-striked" : ""
          }
          `}
        >
          {this.props.event.description}
        </div>
      </article>
    );
  }
}

export default EventListItem;
