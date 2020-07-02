import React, {useEffect, FC, useState} from "react"
import {connect, ConnectedProps} from "react-redux"
import {auth} from "../../firebase/firebase"
import Status from "./Status/Status"
import {getUserAvatarThunkAC, getUserNameThunkAC, setUserId} from "../../redux/reducers/profile/profileReducer"
import {StoreType} from "../../redux/reduxStore"
import ModalWindow from "../Modal/Modal"
import ImageInputContainer from "../ImageHandler/ImageInputContainer"
// @ts-ignore
import styled from 'styled-components'

const StyledProfile = styled.div`
    width: 280px;
    height: 600px;
    background: white;
    margin-left: 50px;
    border-radius: 7px;
    box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.16);
`

const Avatar = styled.img`
    width: 100%;
    height: auto;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    box-shadow: 0px 0px 15px -5px rgba(0,0,0,0.16);
`

const Info = styled.div`
    padding: 0 15px;
`

const Name = styled.div`
    font-weight: 700;
    font-size: 22px;
    color: #434343;
    margin-top: 30px;
    margin-bottom: 20px;
`

const City = styled.p`
    font-weight: 600;
    font-size: 12px;
    color: #9FA0AA;
    margin-bottom: 20px;
`

const Profile: FC<PropsFromRedux> = ({avatar, firstName, userID, setUserId, getName, getAvatar}) => {
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
        <StyledProfile className='profile'>
            <Avatar src={avatar} alt="Avatar" onClick={onClickToChangePhoto}/>
            <Info>
                <Name>{firstName}</Name>
                <City>Saint-Petersburg<span> &middot; </span>Russia</City>
                <Status/>
                {auth.currentUser && <button onClick={signOut}>Sign out</button>}
            </Info>
            {showModal ? <ModalWindow text={'change your photo'}
                                      show={showModal}
                                      confirm={confirmChangePhoto}
                                      cancel={onCancelChangePhoto}/> : null}
            {showImageInput ? <ImageInputContainer exactPath={'profile'}/> : null}
        </StyledProfile>
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
