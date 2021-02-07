// boiler plate start
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// rendering the app
ReactDOM.render(<App />, document.getElementById("root"));
// boiler plate end

/* 
FLOW OF DATA

at index.js rendering the app after importing and exporting it ,
At app.js we have defined a render which returns 2 components InputBox and TaskList

in InputBox we have defined what to do in rendering it returns a h1 tag

TaskList - a ccb which has state and defined what on rendering it, it depends on the tasks state as it render all the tasks in it using map function and return it uses the Task Component

Task = stateless function component which takes props and defined there what to  do on its rendering

--------

deleteTask by X and datapassing from child to parent

in this you write a function in parent and pass it in the props to the child component then call that from child with proper parameters to be passed in function this way the data is received to the parent

Note that while passing we have to write deleteTheTaks(id) but it will be called immediately thus wrap in a function and passed that wrapper function to on click

-----
inputBox takes the task we get the task Description from input text, but that is needed in the parent component
 i.e the App(same as above data passing from child to parent) thus needed to define it in the app and pass it in
 e props to the child(here handleOnChange) but then need to be passed to the TaskList to add to its State thus 
 do LIFTING OF THE STATE - state,deleteTask,AddTask cut it from tasklist to the app.js and then receive from 
 input and do properly.

 but deleteTask needed in the TaskList aswell (to pass to Task component as earlier(see in
 ss) to add to div-X onClick) so pass it in the props of the TaskList component from app 
 which later passes to props to the task

*/
