import React from "react";
import classes from '../Profile/Profile.module.css'
import {AvatarContext} from "../../context";

const Profile = props => {
    return (
        <AvatarContext.Consumer>
            {
                value => {
                    return (<div className={classes.Profile}>
                        <img src={value.avatar} alt="Avatar"/>
                        <div>
                            <p>Benzin Kanister</p>
                            <p>On my way to be front-end developer</p>
                        </div>
                        <div>
                            <p>Contact links</p>
                            <p>Saint-Petersburg, Russia</p>
                        </div>
                    </div>)
                }
            }

        </AvatarContext.Consumer>

    )
}

export default Profile
