import React from 'react'
import {signUpThunkAC} from "../../../redux/reducers/profileReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import CreateAccount from "./CreateAccount";

const SignUpContainer = props => {

    const handleSignUp = (formData) => {
        props.signUp(formData.firstName, formData.lastName, formData.userEmail, formData.userPassword)
    }

    return (
        !!props.userID
            ? <Redirect exact to={'/'} />
            : <CreateAccount onSubmit={handleSignUp}/>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (firstName, lastName, email, password) =>  dispatch(signUpThunkAC(firstName, lastName, email, password))
    }
}

export default connect(null, mapDispatchToProps)(SignUpContainer)