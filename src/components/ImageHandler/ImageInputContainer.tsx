import React, {ChangeEvent} from 'react'
import {auth, storage} from "../../firebase/firebase";
import ImageInput from "./ImageInput";
import {addPhotoToPostCreator} from "../../redux/reducers/posts/postsReducer";
import {connect, ConnectedProps} from "react-redux";
import {StoreType} from "../../redux/reduxStore";
import { updateUserAvatarThunkAC } from '../../redux/reducers/profile/profileReducer';

type Props = PropsFromRedux & {
    exactPath: string
}

const ImageInputContainer = ({postImage, addPhoto, changeAvatar, exactPath}: Props) => {

    const downloadImage = (e: ChangeEvent<HTMLInputElement>) => {
        return new Promise((resolve, reject) => {
            const image: File | null = e.target.files ? e.target.files[0] : null
            if (image) {
                resolve(image)
            } else {
                let error = new Error('something went wrong')
                reject(error)
            }
        }).then(image => handleFireBaseUpload(image))
    }

    const handleFireBaseUpload = (image: any) => {
        const uploadTask = storage.ref(`${auth.currentUser!.uid}/images/${exactPath}/${image.name}`).put(image)
        uploadTask.on('state_changed',
            (snapShot) => {
                console.log(snapShot)
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref(`${auth.currentUser!.uid}/images/${exactPath}/`).child(image.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        addPhoto(fireBaseUrl)
                        if (exactPath === 'profile') {
                            changeAvatar(fireBaseUrl)
                        }
                    })
        })
    }

    return (
        <div>
            <ImageInput
                downloadImage={downloadImage}
                postImage={postImage}
            />
            <p>add photo or emoji</p>
        </div>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        postImage: state.posts.postImage
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addPhoto: (url: string) => dispatch(addPhotoToPostCreator(url)),
        changeAvatar: (url: string) => dispatch(updateUserAvatarThunkAC(url))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ImageInputContainer)