import React from 'react'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Preloader from "../Preloader/Preloader";
import {StoreType} from "../../redux/reduxStore";

const withAuth = (Component: React.ComponentType) => {
    const withAuthRedirect = (props: any) => {
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

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: state.profile.userID
    }
}

export default withAuth