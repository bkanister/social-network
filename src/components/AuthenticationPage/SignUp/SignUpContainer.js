import React from 'react'
import {signUpThunkAC} from "../../../redux/reducers/profileReducer";
import SignUp from "./SignUp";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const SignUpContainer = props => {

    const handleSignUp = (formData) => {
        debugger
        props.signUp(formData.displayName, formData.userEmail, formData.userPassword)
    }

    return (
        !!props.userID
            ? <Redirect exact to={'/'} />
            : <SignUp onSubmit={handleSignUp}/>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (name, email, password) =>  dispatch(signUpThunkAC(name, email, password))
    }
}

export default connect(null, mapDispatchToProps)(SignUpContainer)