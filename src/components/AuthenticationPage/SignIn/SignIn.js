import React from 'react'
import {Link} from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import {minLength, required} from "../../../validators";
import {Input} from "../../formComponents/Input";
import classes from '../SignIn/SignIn.module.css'

const minLength6= minLength(6)

let SignIn = (props) => {
    return (
        <div>
            <h1>Sign In</h1>
            <div>
                <form onSubmit={props.handleSubmit} >
                    <div className={classes.group}>
                        <Field name="userEmail" component={Input} type="email" validate={[required]}/>
                        <span className={classes.bar}/>
                        <label htmlFor="userEmail">Email:</label>
                    </div>
                    <div className={classes.group}>
                        <Field name="userPassword" component={Input} type="password" validate={[required, minLength6]}/>
                        <span className={classes.bar}/>
                        <label htmlFor="userPassword">Password:</label>
                    </div>
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