import React, {useEffect} from "react";
import classes from '../UsersProfile/UsersProfile.module.css'
import axios from "axios";

const UserProfile = props => {
    let user = {}
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${props.match.params.id}`).then((response) => {
            user = response.data
            console.log(user)
        })
    })

    return (
        <div className={classes.UsersProfile}>
            <img src='' alt="Avatar"/>
            <div>
                <p>{user.fullName}</p>
                <p>No data</p>
            </div>
            <div>
                <p>Contact links</p>
                <p>Unknown</p>
            </div>
        </div>
    )
}


export default UserProfile
