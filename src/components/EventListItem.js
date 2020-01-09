import React, { Component } from "react";

class EventListItem extends Component {
  render() {
    return (
      <div className={"card has-margin-bottom-20"}>
        <div className={"card-header"}>
          <span className={"card-header-title"}>{this.props.title}</span>
        </div>
        <div className={"card-content"}>
          <span className="content">{this.props.description}</span>
        </div>
      </div>
    );
  }
}

export default EventListItem;
