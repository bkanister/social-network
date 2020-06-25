import React, {FC} from 'react'
import {signUpThunkAC} from "../../../redux/reducers/profileReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import CreateAccount from "./CreateAccount";
import { StoreType } from '../../../redux/reduxStore';

type PropsType = {
    userID: string
    signUp: (firstName: string, lastName: string,
             email: string, password: string) => void
}

const SignUpContainer: FC<PropsType> = ({userID, signUp}) => {

    const handleSignUp = (formData: any) => {
        signUp(formData.firstName, formData.lastName, formData.userEmail, formData.userPassword)
    }

    return (
        !!userID
            ? <Redirect exact to={'/'} />
            : <CreateAccount onSubmit={handleSignUp}/>
    )
}
const mapStateToProps = (state: StoreType) => {
    return {
        userID: state.profile.userID
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        signUp: (firstName: string, lastName: string,
                 email: string, password: string) =>  dispatch(signUpThunkAC(firstName, lastName, email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer)