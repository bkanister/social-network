import React from 'react'
import {Link} from "react-router-dom";
import {Field, reduxForm} from 'redux-form';
import {minLength, required} from "../../../validators";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const minLength6= minLength(6)

let SignInStyled = (props) => {
    return (
        <div>
            <h1>Sign In</h1>
            <div>
                <Form onSubmit={props.handleSubmit} >
                    <InputContainer2 name='userEmail' type='email'
                                    label='Email: ' validate={[required, minLength6]}/>
                    <InputContainer2 name='userPassword' type='password'
                                    label='Password: ' validate={[required, minLength6]}/>
                    <Button variant='primary' type="submit">Sign in</Button>
                </Form>
                <p>
                    Don't have an account?{" "}
                    <Link to={'/auth/sign-up'}>Sign up here</Link>{" "}
                </p>
            </div>
        </div>
    )
}

SignInStyled = reduxForm({
    form: 'login'
})(SignInStyled);

const InputContainer2 = (props) => {
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


export default SignInStyled