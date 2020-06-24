import React, {useState} from 'react'
import NewTaskForm from "./NewTaskCreator";
import Tasks from "./TasksList";

const MyTasksContainer = () => {
    const [tasks, setTasks] = useState(['hello1', 'hello2'])

    const addTask = (formData: any) => {
        setTasks([...tasks, formData.newTaskInput])
    }

    return (
        <div>
            <h1>My tasks</h1>
            <NewTaskForm onSubmit={addTask}/>
            <Tasks tasks={tasks}/>
        </div>
    )
}


export default MyTasksContainer
