import React, {useEffect, FC} from "react";
import classes from './Profile.module.css'
import {connect, ConnectedProps} from "react-redux";
import {auth} from "../../firebase/firebase";
import Status from "./Status/Status";
import {getUserNameThunkAC, setUserId} from "../../redux/reducers/profile/profileReducer";
import Button from "react-bootstrap/Button";
import {StoreType} from "../../redux/reduxStore";

type PropsType = PropsFromRedux

const Profile: FC<PropsType> = ({avatar, firstName, userID, setUserId, getName}) => {
    useEffect(() => {
        getName()
    },[userID])

    const signOut = () => {
        auth.signOut().then(function() {
            console.log('successful');
        }).catch(function(error) {
            console.log('An error happened');
        });
        setUserId('')
    }
    return (
        <div className={classes.Profile}>
            <img src={avatar} alt="Avatar"/>
            <div>
                <p>{firstName}</p>
                <Status/>
            </div>
            <div>
                {auth.currentUser && <p>authorized</p>}
                <Button variant="light" onClick={signOut}>Sign out</Button>
                <p>Saint-Petersburg, Russia</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        avatar: state.posts.avatar,
        firstName: state.profile.firstName,
        userID: state.profile.userID
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUserId: (userID: string) => dispatch(setUserId(userID)),
        getName: () => dispatch(getUserNameThunkAC())
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Profile)
