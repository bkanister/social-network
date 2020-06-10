import React, {useEffect} from "react";
import classes from '../UsersProfile/UsersProfile.module.css'
import {withRouter} from "react-router-dom";
import {getUserProfile} from "../../firebase/firebaseRequests";

const UserProfile = props => {
    useEffect(() => {
        getUserProfile(props.dispatch, props.match.params.id)
    })

    const avatar = Object.keys(props.userInfo).length !== 0 ? props.userInfo['photos']['large'] : props.avatar
    const contacts = Object.keys(props.userInfo).length !== 0 ? props.userInfo['contacts'] : ''
    return (
        <div className={classes.UsersProfile}>
            <img src={avatar || props.avatar} alt="Avatar"/>
            <div>
                <p>{props.userInfo.fullName}</p>
                <p>{props.userInfo['lookingForAJobDescription']}</p>
            </div>
            <div>
                <p>{contacts.github}</p>
                <p>Unknown</p>
            </div>
        </div>
    )
}


export default withRouter(UserProfile)
