import React from 'react'
import {setUserEmail, setUserPassword, signInThunkAC} from "../../../redux/reducers/profileReducer";
import SignIn from "./SignIn";
import {withAuth} from "../withAuth";

const SignInContainer = ({dispatch, userEmail, userPassword}) => {
    const onChangeHandler = e => {
        const {name, value} = e.currentTarget;
        if (name === 'userEmail') {
            dispatch(setUserEmail(value));
        } else if (name === 'userPassword'){
            dispatch(setUserPassword(value));
        }
    };

    const handleSignIn = e => {
        e.preventDefault();
        if (userEmail.length < 4) {
            alert('Email address must contain more that 4 symbols');
            return;
        }
        if (userPassword.length < 4) {
            alert('Password must contain more that 4 symbols');
            return;
        }
        dispatch(signInThunkAC(userEmail, userPassword))
    }

    return (

            <SignIn userEmail={userEmail}
                    onChangeHandler={onChangeHandler}
                    userPassword={userPassword}
                    handleSignIn={handleSignIn}
            />
    )
}

export default withAuth(SignInContainer)