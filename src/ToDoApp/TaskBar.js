import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TaksList from "./TasksList";

const TaskBar = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addNewTask = async () => {
    const response = await axios.post("http://localhost:8000/createTask", {
      text,
      isCheck: false,
    });
    setTasks(response.data.data);
    setText("");
  };
  useEffect(async () => {
    const response = await axios.get("http://localhost:8000/allTasks");
    setTasks(response.data.data);
  }, []);

  return (
    <div className="container">
      <h1 className="title">To Do List</h1>
      <div className="task-bar">
        <TextField
          className="text-field"
          id="outlined-textarea"
          placeholder="Create new task"
          value={text}
          variant="outlined"
          multiline
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <IconButton aria-label="delete"
        fontSize="large"
        onClick={() => addNewTask()}>
          <AddIcon />
        </IconButton>
      </div>
      <hr />
      <TaksList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TaskBar;
