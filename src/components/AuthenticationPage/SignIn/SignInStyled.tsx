import React, {FC} from 'react'
import {Link} from "react-router-dom";
import {InjectedFormProps, reduxForm} from 'redux-form';
import {minLength, required} from "../../../validators";
import { InputContainer } from '../../formComponents/Input';
const minLength6= minLength(6)

interface Props {}

const SignInStyled: FC<Props & InjectedFormProps<{}, Props>> = (props: any) => {
    return (
        <div>
            <h1>Sign In</h1>
            <div>
                <form onSubmit={props.handleSubmit} >
                    <InputContainer name='userEmail' type='email'
                                    label='Email: ' validate={[required, minLength6]}/>
                    <InputContainer name='userPassword' type='password'
                                    label='Password: ' validate={[required, minLength6]}/>
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

const SignInStyledForm = reduxForm<{}, Props>({
    form: 'login'
})(SignInStyled);


export default SignInStyledForm