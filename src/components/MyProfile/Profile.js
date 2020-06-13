import React from "react";
import classes from './/Profile.module.css'
import {connect} from "react-redux";
import {auth} from "../../firebase/firebase";
import Status from "./Status/Status";

const Profile = props => {
    return (
        <div className={classes.Profile}>
                        <img src={props.avatar} alt="Avatar"/>
                        <div>
                            <p>Benzin Kanister</p>
                            <Status/>
                        </div>
                        <div>
                            {auth.currentUser && <p>authorized</p>}
                            <p>Saint-Petersburg, Russia</p>
                        </div>
                    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        avatar: state.posts.avatar
    }
}


export default connect(mapStateToProps, null)(Profile)
