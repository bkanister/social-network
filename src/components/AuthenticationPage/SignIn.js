import React from 'react'
import {Link} from "react-router-dom";
import {auth} from "../../firebase/firebase";
import {setUserEmail, setUserId, setUserPassword} from "../../redux/reducers/profileReducer";

const SignIn = props => {
    const onChangeHandler = e => {
        const {name, value} = e.currentTarget;
        if (name === 'userEmail') {
            props.dispatch(setUserEmail(value));
        } else if (name === 'userPassword'){
            props.dispatch(setUserPassword(value));
        }
    };

    const handleSignIn = e => {
        e.preventDefault();
        if (props.userEmail.length < 4) {
            alert('Email address must contain more that 4 symbols');
            return;
        }
        if (props.userPassword.length < 4) {
            alert('Password must contain more that 4 symbols');
            return;
        }

        auth.signInWithEmailAndPassword(props.userEmail, props.userPassword)
            .then(() => {
                props.dispatch(setUserId(auth.currentUser.uid))
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                errorCode === 'auth/wrong-password'
                    ? alert('Wrong password')
                    : alert(errorMessage);
                console.log(error);
            })
    }

    return (
        <div>
            <h1>Sign In</h1>
            <div>
                <form>
                    <label htmlFor="userEmail">Email:</label>
                    <input
                        type="email"
                        name="userEmail"
                        value = {props.userEmail}
                        placeholder="E.g: my.name@gmail.com"
                        id="userEmail"
                        onChange={(e) => onChangeHandler(e)}
                    />
                    <br/>
                    <label htmlFor="userPassword">Password:</label>
                    <input
                        type="password"
                        name="userPassword"
                        value = {props.userPassword}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange = {(event) => onChangeHandler(event)}
                    />
                    <button onClick={(e) => handleSignIn(e)}>Sign in</button>
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