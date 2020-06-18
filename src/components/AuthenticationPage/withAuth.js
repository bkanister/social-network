import React from 'react'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Preloader from "../Preloader/Preloader";

const withAuth = Component => {
    const withAuthRedirect = (props) => {
        if (props.isAuth) {
            return <Component {...props}/>
        } else {
            setTimeout(() => {
                props.history.push('/auth/sign-in');
            }, 3000)
            return <Preloader/>
        }
    }
    return withRouter(connect(mapStateToProps, null)(withAuthRedirect))
}

const mapStateToProps = state => {
    return {
        isAuth: state.profile.userID
    }
}

export default withAuth