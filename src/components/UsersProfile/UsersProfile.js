import React, {useEffect} from "react";
import classes from '../UsersProfile/UsersProfile.module.css'
import axios from "axios";
import {withRouter} from "react-router-dom";

const UserProfile = props => {
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${props.match.params.id}`).then((response) => {
            console.log('response.data', response.data)
            props.dispatch({type: 'SET_USER_PROFILE_INFO', payload: response.data})
        })
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
