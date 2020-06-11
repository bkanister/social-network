import React from 'react'
import {Link} from "react-router-dom";

const SignUp = ({userName, userEmail, userPassword, ...props}) => {
    debugger
    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <form>
                    <label htmlFor="displayName">
                        Display Name:
                    </label>
                    <input
                        type="text"
                        name="displayName"
                        value={userName}
                        placeholder="E.g: Maya"
                        id="displayName"
                        onChange={props.onChangeHandler}
                    />
                    <br/>
                    <label htmlFor="userEmail">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="userEmail"
                        value={userEmail}
                        placeholder="E.g: faruq123@gmail.com"
                        id="userEmail"
                        onChange={props.onChangeHandler}
                    />
                    <br/>
                    <label htmlFor="userPassword">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="userPassword"
                        value={userPassword}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={props.onChangeHandler}
                    />
                    <button onClick={props.handleSignUp}>
                        Sign up
                    </button>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to="./sign-in">Sign in here</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp