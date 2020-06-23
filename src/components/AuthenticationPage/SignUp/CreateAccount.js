import React from 'react'
import {Link} from "react-router-dom";
import {reduxForm} from 'redux-form';
import {InputContainer} from "../../formComponents/Input";
import {minLength, required} from "../../../validators";
import Button from "react-bootstrap/Button";

const minLength5 = minLength(5)

let CreateAccount = (props) => {
    return (
        <div>
            <h1>Create new account</h1>
            <div>
                <form onSubmit={props.handleSubmit}>
                    <InputContainer name='firstName' type='text'
                                    placeholder='First name: ' validate={[required, minLength5]}/>
                    <InputContainer name='lastName' type='text'
                                    placeholder='Last name: ' validate={[required, minLength5]}/>
                    <InputContainer name='userEmail' type='email'
                                    placeholder='Email: ' validate={[required, minLength5]}/>
                    <InputContainer name='userPassword' type='password'
                                    placeholder='Password: ' validate={[required, minLength5]}/>
                    <Button variant="success" type='submit'>SIGN UP</Button>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to="./sign-in">Sign in here</Link>
                </p>
            </div>
        </div>
    )
}

CreateAccount = reduxForm({
    form: 'createAccount'
})(CreateAccount);

export default CreateAccount