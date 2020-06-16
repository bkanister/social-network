import React from "react";
import classes from './Profile.module.css'
import {connect} from "react-redux";
import {auth} from "../../firebase/firebase";
import Status from "./Status/Status";
import {setUserId} from "../../redux/reducers/profileReducer";

const Profile = props => {
    const signOut = () => {
        auth.signOut().then(function() {
            console.log('successful');
        }).catch(function(error) {
            console.log('An error happened');
        });
        props.setUserId('')
    }
    return (
        <div className={classes.Profile}>
                        <img src={props.avatar} alt="Avatar"/>
                        <div>
                            <p>Benzin Kanister</p>
                            <Status/>
                        </div>
                        <div>
                            {auth.currentUser && <p>authorized</p>}
                            <button onClick={signOut}>Sign out</button>
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

const mapDispatchToProps = dispatch => {
    return {
        setUserId: (userID) => dispatch(setUserId(userID))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
