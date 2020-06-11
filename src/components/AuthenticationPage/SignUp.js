import React from 'react'
import {Link} from "react-router-dom";
import {auth, firestore} from "../../firebase/firebase";
import {setUserEmail, setUserId, setUserName, setUserPassword} from "../../redux/reducers/profileReducer";

const SignUp = props => {

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            props.dispatch(setUserEmail(value));
        } else if (name === "userPassword") {
            props.dispatch(setUserPassword(value));
        } else if (name === "displayName") {
            props.dispatch(setUserName(value));
        }
    };

    const handleSignUp = (event, email, password) => {
        event.preventDefault();
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((response) => {
                props.dispatch(setUserId(auth.currentUser.uid))
                firestore.collection('users').doc(auth.currentUser.uid)
                    .set({
                        name: props.userName,
                        email: props.userEmail
                    })
            .catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
        });
    })
    }
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
                        value={props.userName}
                        placeholder="E.g: Maya"
                        id="displayName"
                        onChange={event => onChangeHandler(event)}
                    />
                    <br/>
                    <label htmlFor="userEmail">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="userEmail"
                        value={props.userEmail}
                        placeholder="E.g: faruq123@gmail.com"
                        id="userEmail"
                        onChange={event => onChangeHandler(event)}
                    />
                    <br/>
                    <label htmlFor="userPassword">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="userPassword"
                        value={props.userPassword}
                        placeholder="Your Password"
                        id="userPassword"
                        onChange={event => onChangeHandler(event)}
                    />
                    <button
                        onClick={event => {
                            handleSignUp(event, props.userEmail, props.userPassword);
                        }}>
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