import React from 'react'
import classes from "../AuthenticationPage/SignIn/SignIn.module.css";
import {Field} from "redux-form";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";


export const InputContainer = (props) => {
    return (
        <div className={classes.group}>
            <Field name={props.name} component={Input}
                   type={props.type} validate={props.validate}
                   placeholder={props.placeholder}/>
            <span className={classes.bar}/>
        </div>
    )
}

const Input = ({input, meta, ...props}) => {
    return (
        <>
            <input type={props.type} placeholder={props.placeholder} {...input}/>
            {meta.touched && !meta.valid && <span style={{color: "red"}}>*{meta.error}</span>}
        </>
    )
}

export const InputContainer2 = (props) => {
    return (
        <Form.Group controlId={`formBasic${props.name}`}>
            <Field name={props.name} component={Input2} type={props.type} validate={props.validate}/>
            <Form.Label>{props.label}</Form.Label>
        </Form.Group>
    )
}
const Input2 = ({input, meta, ...props}) => {
    return (
        <>
            <Form.Control type={props.type} {...input} />
            {meta.touched && !meta.valid && <Alert variant='danger'>*{meta.error}</Alert>}
        </>
    )
}
