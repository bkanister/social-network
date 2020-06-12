import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

export const withAuth = Component => {
    const withAuthRedirect = (props) => {
        console.log('props.isAuth: ', !!props.isAuth)
        return props.isAuth ? <Component {...props}/> : <Redirect to={'/auth/sign-in'}/>
    }
    return connect(mapStateToProps, null)(withAuthRedirect)
}

const mapStateToProps = state => {
    return {
        isAuth: state.profile.userID
    }
}