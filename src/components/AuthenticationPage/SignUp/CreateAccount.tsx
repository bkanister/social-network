import React, {FC} from 'react'
import {Link} from "react-router-dom";
import {InjectedFormProps, reduxForm} from 'redux-form';
import {InputContainer} from "../../formComponents/Input";
import {minLength, required} from "../../../validators";

const minLength5 = minLength(5)

interface Props {}

const CreateAccount: FC<Props & InjectedFormProps<{}, Props>> = (props: any) => {
    return (
        <div>
            <h1>Create new account</h1>
            <div>
                <form onSubmit={props.handleSubmit}>
                    <InputContainer name='firstName' type='text' label='First name:'
                                    placeholder='First name: ' validate={[required, minLength5]}/>
                    <InputContainer name='lastName' type='text' label='Last name:'
                                    placeholder='Last name: ' validate={[required, minLength5]}/>
                    <InputContainer name='userEmail' type='email' label='E-mail:'
                                    placeholder='Email: ' validate={[required, minLength5]}/>
                    <InputContainer name='userPassword' type='password' label='Password'
                                    placeholder='Password: ' validate={[required, minLength5]}/>
                    <button type='submit'>SIGN UP</button>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to="./sign-in">Sign in here</Link>
                </p>
            </div>
        </div>
    )
}

const SignUpForm = reduxForm<{}, Props>({
    form: 'createAccount'
})(CreateAccount);

export default SignUpForm