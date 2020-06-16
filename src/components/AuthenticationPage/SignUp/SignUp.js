import React from 'react'
import {Link} from "react-router-dom";
import { Field, reduxForm } from 'redux-form';

let SignUp = (props) => {
    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <form onSubmit={props.handleSubmit}>
                    <label htmlFor="displayName">Display Name:</label>
                    <Field name="displayName" component='input' type="text"/>
                    <br/>

                    <label htmlFor="userEmail">Email:</label>
                    <Field name="userEmail" component='input' type="email"/>
                    <br/>

                    <label htmlFor="userPassword"> Password:</label>
                    <Field name="userPassword" component='input' type="password"/>
                    <button>Sign up </button>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to="./sign-in">Sign in here</Link>
                </p>
            </div>
        </div>
    )
}

SignUp = reduxForm({
    form: 'signup'
})(SignUp);

export default SignUp