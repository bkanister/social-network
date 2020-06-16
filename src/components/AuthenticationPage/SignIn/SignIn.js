import React from 'react'
import {Link} from "react-router-dom";
import { Field, reduxForm } from 'redux-form';

let SignIn = (props) => {
    return (
        <div>
            <h1>Sign In</h1>
            <div>
                <form onSubmit={props.handleSubmit} >
                    <label htmlFor="userEmail">Email:</label>
                    <Field name="userEmail" component='input' type="email"/>
                    <br/>
                    <label htmlFor="userPassword">Password:</label>
                    <Field name="userPassword" component='input' type="password"/>
                    <button type="submit">Sign in</button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <Link to={'/auth/sign-up'}>Sign up here</Link>{" "}
                </p>
            </div>
        </div>
    )
}

SignIn = reduxForm({
    form: 'login'
})(SignIn);

export default SignIn