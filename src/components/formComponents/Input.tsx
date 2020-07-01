import React, {FC} from 'react'
import {Field} from "redux-form";


type InputContainerPropsType = {
    name: string
    type: string
    label?: string
    validate?: any
    placeholder?: string
}

export const InputContainer: FC<InputContainerPropsType> = ({name, type, label, validate}) => {
    return (
        <form>
            <label>{label}</label>
            <Field name={name} component={Input} type={type} validate={validate}/>
        </form>
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
            <input type={props.type} {...input} />
            {meta.touched && !meta.valid && <p>*{meta.error}</p>}
        </>
    )
}
