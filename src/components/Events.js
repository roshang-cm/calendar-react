import React, { Component } from "react";
import { api, filterEventsByDate } from "../methods";
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

  updateFetchedData = async () => {
    let result = await api.getAllEvents(this.state.user.jwt);
    this.setState({
      events: filterEventsByDate(this.props.date, result),
      showEditable: false
    });
  };
  constructor(props) {
    super(props);
    this.updateFetchedData();
  }

  addEvent = async changes => {
    let result = await api.addEvent(
      this.state.user.jwt,
      this.props.date,
      changes.title,
      changes.description,
      changes.completed
    );
    this.updateFetchedData();
  };

  deleteEvent = async event => {
    let result = await api.deleteEvent(this.state.user.jwt, event.id);
    this.updateFetchedData();
  };

  editEvent = async changes => {
    console.log(changes);
    let result = await api.editEvent(
      this.state.user.jwt,
      changes.id,
      changes.date,
      changes.title,
      changes.description,
      changes.completed
    );
    this.updateFetchedData();
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

  markEventAsComplete = async event => {
    let changes = event;
    changes.completed = true;
    let result = await api.editEvent(
      this.state.user.jwt,
      changes.id,
      changes.date,
      changes.title,
      changes.description,
      changes.completed
    );
    this.updateFetchedData();
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
