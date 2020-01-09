import React, { Component } from "react";

class EventListItem extends Component {
  render() {
    return (
      <article class="message">
        <div className={`message-header`}>
          <p className={`${this.props.event.completed ? "is-striked" : ""}`}>
            {this.props.event.title}
          </p>
          <div className={"level"}>
            <span
              class="icon has-text-danger has-margin-right-10 icon-button"
              onClick={() => this.props.onDeleteClicked(this.props.event)}
            >
              <i class="fas fa-trash"></i>
            </span>
            <span
              class="icon has-text-white has-margin-right-10 icon-button"
              onClick={() => this.props.onEditClicked(this.props.event)}
            >
              <i class="fas fa-edit"></i>
            </span>
            {this.props.event.completed ? (
              ""
            ) : (
              <button
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
