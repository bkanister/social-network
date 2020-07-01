import React from 'react'
import {reduxForm, InjectedFormProps} from 'redux-form';
import {InputContainer} from "../../components/formComponents/Input";

interface NewTaskProps {
    onSubmit: any
}

let NewTaskContainer: React.FC<NewTaskProps & InjectedFormProps<{}, NewTaskProps>> = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <InputContainer name='newTaskInput' type='text'
                                 label='Add new task: '/>
                <button type='submit'>add task</button>
        </form>
    )
}

const NewTaskForm = reduxForm<{}, NewTaskProps>({
    form: 'addNewTask'
})(NewTaskContainer);

export default NewTaskForm


