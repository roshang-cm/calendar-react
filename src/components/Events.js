import React, { Component } from "react";
import {
  getEventsForUser,
  addEventForUser,
  filterEventsByDate
} from "./helpers";
import EditableEventListItem from "./EditableEventListItem";
import EventListItem from "./EventListItem";

class Events extends Component {
  state = {
    user: JSON.parse(localStorage.getItem("user")),
    events: []
  };
  constructor(props) {
    super(props);
    getEventsForUser(this.state.user.id, result => {
      this.setState({
        events: filterEventsByDate(this.props.date, result)
      });
    });
  }

  addEvent = changes => {
    console.log(changes);
    addEventForUser(
      this.state.user.id,
      this.props.date,
      changes.title,
      changes.description,
      changes.completed,
      () => {
        getEventsForUser(this.state.user.id, result => {
          this.setState({
            events: filterEventsByDate(this.props.date, result)
          });
        });
      }
    );
  };
  render() {
    return (
      <div>
        <EditableEventListItem onEditClicked={this.addEvent} />
        {this.state.events.map(event => {
          return (
            <EventListItem
              title={event.title}
              description={event.description}
            />
          );
        })}
      </div>
    );
  }
}

export default Events;
