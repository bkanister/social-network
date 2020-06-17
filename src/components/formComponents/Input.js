import React from 'react'
import classes from "../AuthenticationPage/SignIn/SignIn.module.css";
import {Field} from "redux-form";


export const InputContainer = (props) => {
    return (
        <div className={classes.group}>
            <Field name={props.name} component={Input} type={props.type} validate={props.validate}/>
            <span className={classes.bar}/>
            <label htmlFor={props.name}>{props.label}</label>
        </div>
    )
}

const Input = ({input, meta, ...props}) => {
    return (
        <>
            <input type={props.type} {...input}/>
            {meta.touched && !meta.valid && <span style={{color: "red"}}>*{meta.error}</span>}
        </>
    )
}
