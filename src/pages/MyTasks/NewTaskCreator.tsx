import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import {reduxForm, InjectedFormProps, reset} from 'redux-form';
import {InputContainer2} from "../../components/formComponents/Input";

interface NewTaskProps {
    onSubmit: any
}

let NewTaskContainer: React.FC<NewTaskProps & InjectedFormProps<{}, NewTaskProps>> = (props: any) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <Form.Group controlId="newTaskInput">
                <InputContainer2 name='newTaskInput' type='text'
                                 label='Add new task: '/>
                <Button type='submit'>add task</Button>
            </Form.Group>
        </Form>
    )
}

const NewTaskForm = reduxForm<{}, NewTaskProps>({
    form: 'addNewTask'
})(NewTaskContainer);

export default NewTaskForm


