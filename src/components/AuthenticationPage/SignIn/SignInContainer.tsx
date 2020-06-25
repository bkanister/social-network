import React, {FC} from 'react'
import {signInThunkAC} from "../../../redux/reducers/profile/profileReducer";
import {Redirect} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import SignInStyled from "./SignInStyled";
import {StoreType} from "../../../redux/reduxStore";

type PropsType = PropsFromRedux

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

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SignInContainer)