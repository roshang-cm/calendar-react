import React, { Component } from "react";

class EditableEventListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      date: "",
      completed: false,
      isNew: true
    };
  }
  componentDidMount = () => {
    if (this.props.event)
      this.setState({
        id: this.props.event.id,
        title: this.props.event.title,
        description: this.props.event.description,
        date: this.props.event.date,
        completed: this.props.event.completed ? true : false,
        isNew: false
      });
  };

  handleChanges = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  toggleCompleted = () => {
    this.setState({
      completed: !this.state.completed
    });
  };

  render() {
    return (
      <div>
        <h1 className={"title is-4 has-text-info"}>
          {this.state.isNew ? "Add Event" : "Edit Event"}
        </h1>

        <div className={"card"}>
          <div className={"card-header"}>
            <input
              className={"input title is-4"}
              type="text"
              name={"title"}
              placeholder="Event title"
              defaultValue={this.state.title}
              onChange={this.handleChanges}
              autoFocus
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
        </div>

        <div className={"level has-margin-top-20"}>
          <label class="checkbox">
            <input
              type="checkbox"
              checked={this.state.completed}
              onChange={this.toggleCompleted}
            />
            Already completed
          </label>

          <div className={"level"}>
            <button
              className={
                "button level-right is-danger is-outlined has-margin-right-10"
              }
              onClick={this.props.onCancelClicked}
            >
              Cancel
            </button>

            <button
              className={"button level-right is-info "}
              onClick={() => this.props.onEditClicked(this.state)}
              disabled={!(this.state.title || this.state.description)}
            >
              Save Changes
            </button>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default EditableEventListItem;
