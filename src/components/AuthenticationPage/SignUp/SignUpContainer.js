import React from 'react'
import {
    setUserEmail,
    setUserName,
    setUserPassword,
    signUpThunkAC
} from "../../../redux/reducers/profileReducer";
import SignUp from "./SignUp";

const SignUpContainer = ({dispatch, userName, userEmail, userPassword}) => {
    const onChangeHandler = e => {
        const { name, value } = e.currentTarget;
        if (name === "userEmail") {
            dispatch(setUserEmail(value));
        } else if (name === "userPassword") {
            dispatch(setUserPassword(value));
        } else if (name === "displayName") {
            dispatch(setUserName(value));
        }
    };

    const handleSignUp = e => {
        e.preventDefault();
            if (userEmail.length < 4) {
                alert('Please enter an email address.');
                return;
            }
            if (userPassword.length < 4) {
                alert('Please enter a password.');
                return;
            }
        dispatch(signUpThunkAC(userName, userEmail, userPassword))
    }
    return (
            <SignUp userName={userName}
                    userEmail={userEmail}
                    userPassword={userPassword}
                    onChangeHandler={onChangeHandler}
                    handleSignUp={handleSignUp}
            />
    )
}

export default SignUpContainer