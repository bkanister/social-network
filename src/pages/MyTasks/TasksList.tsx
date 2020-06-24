import React from 'react'


interface TasksProps {
    tasks: Array<string> | []
}

const Tasks: React.FC<TasksProps> = ({tasks}) => {
    return (
        <div>
            {(tasks as Array<string>).map((task: string) => <p>{task}</p>)}
        </div>
    )
}


export default Tasks
