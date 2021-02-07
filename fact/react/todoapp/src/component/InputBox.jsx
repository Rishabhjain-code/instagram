import React, { Component } from "react";

class InputBox extends Component {
  state = {
    task: "",
  };

  handleOnChange = (e) => {
    let value = e.target.value;
    console.log(value);
    this.setState({
      task: value,
    });
  };

  handleAddTask_ = () => {
    // accessing props in ccb via this.props not directly like in sfc i.e props
    this.props.handleAddTask(this.state.task);
    this.setState({
      task: "",
    });
  };

  render() {
    let task = this.state.task;
    return (
      <div className="input-box m-4">
        <input
          type="text"
          onChange={(e) => {
            this.handleOnChange(e);
          }}
          value={task}
        />
        <div
          className="addTask btn btn-primary ml-4"
          onClick={this.handleAddTask_}
        >
          Add Task
        </div>
      </div>
    );
  }
}

export default InputBox;
