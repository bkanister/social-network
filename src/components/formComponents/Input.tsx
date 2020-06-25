import React, {FC} from 'react'
import classes from "../AuthenticationPage/SignIn/SignIn.module.css";
import {Field} from "redux-form";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";


type InputContainerPropsType = {
    name: string
    type: string
    label?: string
    validate?: any
    placeholder?: string
}

export const InputContainer: FC<InputContainerPropsType> = ({name, type, label, validate}) => {
    return (
        <Form.Group controlId={`formBasic${name}`}>
            <Form.Label>{label}</Form.Label>
            <Field name={name} component={Input} type={type} validate={validate}/>
        </Form.Group>
    )
}

type InputPropsType = {
    input: any
    meta: any
    type: string
    touched: boolean
    valid: boolean
    error: any
}

const Input: FC<InputPropsType> = ({input, meta, ...props}) => {
    return (
        <>
            <Form.Control type={props.type} {...input} />
            {meta.touched && !meta.valid && <Alert variant='danger'>*{meta.error}</Alert>}
        </>
    )
}
