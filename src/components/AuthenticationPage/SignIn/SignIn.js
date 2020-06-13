import React from 'react'
import {Link} from "react-router-dom";
const SignIn = ({userEmail, userPassword, ...props }) => {
    return (
        <div>
            <h1>Sign In</h1>
            <div>
                <form>
                    <label htmlFor="userEmail">Email:</label>
                    <input
                        type="email"
                        name="userEmail"
                        value = {userEmail}
                        placeholder="E.g: my.name@gmail.com"
                        id="userEmail"
                        onChange={props.onChangeHandler}
                    />
                    <br/>
                    <label htmlFor="userPassword">Password:</label>
                    <input
                        type="password"
                        name="userPassword"
                        value = {userPassword}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange = {props.onChangeHandler}
                    />
                    <button onClick={props.handleSignIn}>Sign in</button>
                </form>
                <p>
                    Don't have an account?{" "}
                    <Link to={'/auth/sign-up'}>Sign up here</Link>{" "}
                </p>
            </div>
        </div>
    )
}

export default SignIn