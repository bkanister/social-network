import React from 'react'
import {Link} from "react-router-dom";
import {reduxForm} from 'redux-form';
import {InputContainer} from "../../formComponents/Input";
import {minLength, required} from "../../../validators";

const minLength5 = minLength(5)

let SignUp = (props) => {
    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <form onSubmit={props.handleSubmit}>
                    <InputContainer name='displayName' type='text'
                                    label='Display Name: ' validate={[required, minLength5]}/>
                    <InputContainer name='userEmail' type='email'
                                    label='Email: ' validate={[required, minLength5]}/>
                    <InputContainer name='userPassword' type='password'
                                    label='Password: ' validate={[required, minLength5]}/>
                    <button>SIGN UP</button>
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