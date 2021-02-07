import React, { Component } from "react";
import Task from "./Task";

// no need of explicit constructor

class TaskList extends Component {
  state = {};

  render() {
    let tasks = this.props.tasks;
    let deleteTask = this.props.handleDelete;
    // tasks,delete functions

    return (
      <React.Fragment>
        {tasks.map((taskObj) => {
          return (
            <Task
              key={taskObj.id}
              newTasks={taskObj}
              handleDeleteTask={deleteTask}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default TaskList;
