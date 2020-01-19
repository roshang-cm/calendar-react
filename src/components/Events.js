import React, { Component } from "react";
import {
  getEvents,
  performAddEventRequest,
  filterEventsByDate,
  performEditEventRequest,
  performDeleteEventRequest
} from "../methods";
import EditableEventListItem from "./EditableEventListItem";
import EventListItem from "./EventListItem";
import moment from "moment";

class Events extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    events: [],
    showEditable: false,
    currentEvent: null
  };

  updateFetchedData = () => {
    getEvents(this.state.user.id, result => {
      this.setState({
        events: filterEventsByDate(this.props.date, result),
        showEditable: false
      });
    });
  };
  constructor(props) {
    super(props);
    this.updateFetchedData();
  }

  addEvent = changes => {
    console.log(changes);
    performAddEventRequest(
      this.state.user.jwt,
      this.props.date,
      changes.title,
      changes.description,
      changes.completed,
      () => {
        this.updateFetchedData();
      }
    );
  };

  deleteEvent = event => {
    performDeleteEventRequest(
      event.id,
      () => {
        this.updateFetchedData();
      },
      err => {
        console.error(err);
      }
    );
  };

  editEvent = changes => {
    console.log(changes);
    performEditEventRequest(
      changes.id,
      changes.date,
      changes.title,
      changes.description,
      changes.completed,
      result => {
        console.info("EDIT SUCCESS", result);
        this.updateFetchedData();
      },
      error => {
        console.error("EDIT FAILED", error);
      }
    );
  };
  handleEditEventClicked = event => {
    this.setState({
      showEditable: true,
      currentEvent: event
    });
  };
  handleAddEventButtonClicked = () => {
    this.setState({
      showEditable: true,
      currentEvent: null
    });
  };

  markEventAsComplete = event => {
    let changes = event;
    changes.completed = true;
    performEditEventRequest(
      changes.id,
      changes.date,
      changes.title,
      changes.description,
      changes.completed,
      result => {
        console.info("EDIT SUCCESS", result);
        this.updateFetchedData();
      },
      error => {
        console.error("EDIT FAILED", error);
      }
    );
  };
  render() {
    return (
      <div>
        <div className={"level"}>
          <h1
            className={
              "title has-text-primary level-left is-marginless is-paddingless"
            }
          >
            {moment(this.props.date).format("MMMM Do YYYY")}
          </h1>

          {this.state.showEditable ? (
            ""
          ) : (
            <button
              className={`button is-success`}
              disabled={!this.state.user.write}
              title={
                this.state.user.write
                  ? "Add a new event"
                  : "You do not have the permission to add events"
              }
              onClick={this.handleAddEventButtonClicked}
            >
              Add new event
            </button>
          )}
        </div>
        <hr />
        {this.state.showEditable ? (
          <EditableEventListItem
            key={this.state.currentEvent ? this.state.currentEvent.id : 0}
            event={this.state.currentEvent}
            onEditClicked={
              this.state.currentEvent ? this.editEvent : this.addEvent
            }
            onCancelClicked={() => {
              this.setState({
                currentEvent: null,
                showEditable: false
              });
            }}
          />
        ) : (
          ""
        )}
        {this.state.events.map(event => {
          return (
            <EventListItem
              event={event}
              onDeleteClicked={this.deleteEvent}
              onEditClicked={this.handleEditEventClicked}
              onMarkAsCompleteClicked={this.markEventAsComplete}
            />
          );
        })}
      </div>
    );
  }
}

export default Events;
