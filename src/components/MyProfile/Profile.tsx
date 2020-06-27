import React, {useEffect, FC, useState} from "react";
import classes from './Profile.module.css'
import {connect, ConnectedProps} from "react-redux";
import {auth} from "../../firebase/firebase";
import Status from "./Status/Status";
import {getUserAvatarThunkAC, getUserNameThunkAC, setUserId} from "../../redux/reducers/profile/profileReducer";
import Button from "react-bootstrap/Button";
import {StoreType} from "../../redux/reduxStore";
import ModalWindow from "../Modal/Modal";
import ImageInputContainer from "../ImageHandler/ImageInputContainer";

type PropsType = PropsFromRedux

const Profile: FC<PropsType> = ({avatar, firstName, userID, setUserId, getName, getAvatar}) => {
    const [showModal, setShowModal] = useState(false);
    const [showImageInput, setShowImageInput] = useState(false);

    const onClickToChangePhoto = () => {
        setShowModal(true);
    }

    const onCancelChangePhoto = () => {
        setShowModal(false);
    }

    const confirmChangePhoto = () => {
        setShowModal(false);
        setShowImageInput(true)
    }

    useEffect(() => {
        getName()
    },[userID])

    useEffect(() => {
        getAvatar()
    },[avatar])

    const signOut = () => {
        auth.signOut().then(function() {
            console.log('successful sign out');
        }).catch(function(error) {
            console.log('An error happened');
        });
        setUserId('')
    }
    return (
        <div className={classes.Profile}>
                <img onClick={onClickToChangePhoto} src={avatar} alt="Avatar"/>
            <div>
                <p>{firstName}</p>
                <Status/>
            </div>
            <div>
                {auth.currentUser && <p>authorized</p>}
                <Button variant="light" onClick={signOut}>Sign out</Button>
                <p>Saint-Petersburg, Russia</p>
            </div>
            {showModal ? <ModalWindow text={'change your photo'}
                                      show={showModal}
                                      confirm={confirmChangePhoto}
                                      cancel={onCancelChangePhoto}/> : null}
            {showImageInput ? <ImageInputContainer exactPath={'profile'}/> : null}
        </div>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        avatar: state.profile.avatar,
        firstName: state.profile.firstName,
        userID: state.profile.userID
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUserId: (userID: string) => dispatch(setUserId(userID)),
        getName: () => dispatch(getUserNameThunkAC()),
        getAvatar: () => dispatch(getUserAvatarThunkAC())
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Profile)
