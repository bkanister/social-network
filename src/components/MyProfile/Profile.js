import React from "react";
import classes from './/Profile.module.css'
import {connect} from "react-redux";

const Profile = props => {
    return (
        <div className={classes.Profile}>
                        <img src={props.avatar} alt="Avatar"/>
                        <div>
                            <p>Benzin Kanister</p>
                            <p>On my way to be front-end developer</p>
                        </div>
                        <div>
                            <p>Contact links</p>
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
