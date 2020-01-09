import React, { Component } from "react";

class EditableEventListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? this.props.title : "",
      description: this.props.description ? this.props.description : "",
      date: this.props.date ? this.props.date : "",
      completed: this.props.completed ? this.props.completed : false
    };
  }
  handleChanges = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };
  sendChangesToParent = () => {
    this.props.onEditClicked({
      title: this.state.title,
      description: this.state.description,
      completed: this.state.completed
    });
  };
  render() {
    return (
      <div className={"card"}>
        <div className={"card-header"}>
          <input
            className={"input"}
            type="text"
            name={"title"}
            placeholder="Event title"
            defaultValue={this.state.title}
            onChange={this.handleChanges}
          />
        </div>
        <textarea
          className={"textarea"}
          name={"description"}
          type="text"
          placeholder="Event description"
          onChange={this.handleChanges}
          defaultValue={this.state.description}
        />
        <button className={"button"} onClick={this.sendChangesToParent}>
          Add Event
        </button>
      </div>
    );
  }
}

export default EditableEventListItem;
