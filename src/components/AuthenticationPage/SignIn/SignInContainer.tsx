import React, {FC} from 'react'
import {signInThunkAC} from "../../../redux/reducers/profileReducer";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import SignInStyled from "./SignInStyled";
import {StoreType} from "../../../redux/reduxStore";

type PropsType = {
    userID: string
    signIn: (userEmail: string, userPassword: string) => void
}

const SignInContainer: FC<PropsType> = ({userID, signIn}) => {

    const handleSignIn = (formData: any) => {
        signIn(formData.userEmail, formData.userPassword)
    }

    return (
        !!userID
            ? <Redirect exact to={'/'} /> // fix this! redirect user to previous page
            : <SignInStyled onSubmit={handleSignIn}/>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        userID: state.profile.userID
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        signIn: (userEmail: string, userPassword: string) => dispatch(signInThunkAC(userEmail, userPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)