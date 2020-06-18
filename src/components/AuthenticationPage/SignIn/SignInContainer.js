import React from 'react'
import {signInThunkAC} from "../../../redux/reducers/profileReducer";
import {Redirect} from "react-router-dom";
import SignIn from "./SignIn";
import {connect} from "react-redux";

const SignInContainer = (props) => {

    const handleSignIn = (formData) => {
        props.signIn(formData.userEmail, formData.userPassword)
    }

    return (
        !!props.userID
            ? <Redirect exact to={'/'} /> // fix this! redirect user to previous page
            : <SignIn onSubmit={handleSignIn}/>
    )
}

const mapStateToProps = state => {
    return {
        userID: state.profile.userID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (userEmail, userPassword) => dispatch(signInThunkAC(userEmail, userPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)