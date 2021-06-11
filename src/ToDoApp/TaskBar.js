import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaksList from './TasksList'

const TaskBar = () => {

    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState ('');

    const addNewTask = async () => {
        const response = await axios.post('http://localhost:8000/createTask', {
        text,
        isCheck: false
        });
        setTasks(response.data.data);
        setText('');
    }
    useEffect( async () => {
       const response =  await axios.get('http://localhost:8000/allTasks');
       setTasks(response.data.data);
    }, [])


    return(
        <div>
            <div className="task-bar">
                <input type="text" placeholder="create new task" autoFocus value={text} onChange={(e) => {setText(e.target.value)}}/>
                <button onClick={addNewTask}>Add</button>
                <button>delete all</button>
            </div>
            <hr />
            <TaksList  tasks={tasks} setTasks={setTasks}/>
        </div>
    )
} 

export default TaskBar;