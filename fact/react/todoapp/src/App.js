// boiler plate start
// import React, {Component} from 'react'

// const App = ()=>{
//     return (<h1>Hello from react component</h1>);
// }

// export default App;
// boiler plate end

import React, { Component } from "react";
import InputBox from "./component/InputBox";
import TaskList from "./component/TaskList";

class App extends Component {
  // state uplifting
  state = {
    tasks: [
      { id: 1, task: "Learn ES6" },
      { id: 2, task: "Learn ES5" },
      { id: 3, task: "Learn ES4" },
      { id: 4, task: "Learn ES3" },
      { id: 5, task: "Learn ES2" },
      { id: 6, task: "Learn ES1" },
    ],
  };

  deleteTask = (id) => {
    let newTasks = this.state.tasks.filter((taskObj) => {
      return taskObj.id != id;
    });

    this.setState({
      tasks: newTasks,
    });
  };

  addTask = (newTask) => {
    // ...[{},{},{},{}] == {},{},{},{}
    let newObj = { id: this.state.tasks.length + 1, task: newTask };
    let newTasks = [...this.state.tasks, newObj];
    // [{},{},{}];
    this.setState({
      tasks: newTasks,
    });
  };

  render() {
    let tasks = this.state.tasks;
    let deleteTask = this.deleteTask;
    let addTask = this.addTask;

    return (
      <React.Fragment>
        <InputBox handleAddTask={addTask} />
        <TaskList tasks={tasks} handleDelete={deleteTask} />
      </React.Fragment>
    );
  }
}

export default App;
