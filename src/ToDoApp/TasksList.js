import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import IconSave from "@material-ui/icons/Save";
import IconCancel from "@material-ui/icons/Cancel";
import IconEdit from "@material-ui/icons/Edit";
import IconDelete from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";

const TasksList = ({ tasks, setTasks }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [currentText, setText] = useState("");

  const changeStatus = async (item) => {
    let { text, isCheck, id } = item;
    const response = await axios.patch(
      `http://localhost:8000/updateTask?id=${id}`,
      {
        text: text,
        isCheck: !isCheck,
        id: id,
      }
    );
    setTasks(response.data.data.sort((a, b) => a.isCheck - b.isCheck));
  };

  //edit Task's text function
  const editTask = (index) => {
    if (!tasks[index].isCheck) {
      setEditIndex(index);
      setText(tasks[index].text);
    }
  };

  //   //Save changes
  const saveChanges = async (item) => {
    let { text, isCheck, id } = item;
    if (currentText) {
      setEditIndex(-1);
      const response = await axios.patch(
        `http://localhost:8000/updateTask?id=${id}`,
        {
          text: currentText,
          isCheck: isCheck,
          id: id,
        }
      );
      setTasks(response.data.data);
    }
  };
  // Save our changes to press enter
  const saveChangesToEnter = async (e, item) => {
    if (e.key === "Enter") saveChanges(item);
  };

  //cancel changes
  const cancelChange = () => {
    setEditIndex(-1);
  };

  //delete task
  const deleteThisTask = async (item) => {
    const response = await axios.delete(
      `http://localhost:8000/deleteTask?id=${item.id}`
    );
    setTasks(response.data.data);
  };

  return (
    <div className="list">
      {tasks.map((item, index) => {
        return index === editIndex ? (
          <div className={item.isCheck ? `checked` : `normal`} key={index}>
            <Checkbox
              color="primary"
              checked={item.isCheck}
              className="checkbox"
              id={`checkbox-${item.id}`}
              onClick={() => changeStatus(item)}
              disabled
            />
            <TextField
              className="textarea"
              id={`text-${item.id}`}
              value={currentText}
              multiline
              autoFocus
              onChange={(e) => setText(e.target.value)}
              onKeyUp={(e) => saveChangesToEnter(e, item)}
              variant="outlined"
            />
            <IconButton>
              <IconSave
                className="save"
                id={`save-${item.id}`}
                alt="save"
                onClick={() => saveChanges(item)}
              />
            </IconButton>
            <IconButton aria-label="cancel">
              <IconCancel
                className="cancel"
                id={`cancel-${item.id}`}
                alt="cancel"
                onClick={() => cancelChange()}
              />
            </IconButton>
          </div>
        ) : (
          <div className={item.isCheck ? `checked` : `normal`} key={index}>
            <Checkbox
              color="primary"
              checked={item.isCheck}
              className="checkbox"
              id={`checkbox-${item.id}`}
              onClick={() => changeStatus(item)}
            />
            <span className="text" id={`text-${item.id}`}>
              {item.text}
            </span>
            <IconButton aria-label="edit">
              <IconEdit
                className="edit"
                id={`edit-${item.id}`}
                alt="edit"
                onClick={() => editTask(index)}
              />
            </IconButton>
            <IconButton aria-label="delete">
              <IconDelete
                className="delete"
                id={`delete-${item.id}`}
                alt="delete"
                onClick={() => deleteThisTask(item)}
              />
            </IconButton>
          </div>
        );
      })}
    </div>
  );
};

export default TasksList;
