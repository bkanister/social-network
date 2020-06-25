import React, {ChangeEvent} from 'react'
import {storage} from "../../firebase/firebase";
import ImageInput from "./ImageInput";
import {addPhotoCreator} from "../../redux/reducers/posts/postsReducer";
import {connect, ConnectedProps} from "react-redux";
import {StoreType} from "../../redux/reduxStore";

type Props = PropsFromRedux

const ImageInputContainer = ({postImage, addPhoto}: Props) => {

    const downloadImage = (e: ChangeEvent<HTMLInputElement>) => {
        return new Promise((resolve, reject) => {
            const image: File | null = e.target.files ? e.target.files[0] : null
            // const image: File | null = e.target.files[0]
            if (image) {
                resolve(image)
            } else {
                let error = new Error('something went wrong')
                reject(error)
            }
        }).then(image => handleFireBaseUpload(image))
    }

    const handleFireBaseUpload = (image: any) => {
        const uploadTask = storage.ref(`/images/${image.name}`).put(image)
        uploadTask.on('state_changed',
            (snapShot) => {
                console.log(snapShot)
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('images').child(image.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        addPhoto(fireBaseUrl)
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
        addPhoto: (url: string) => dispatch(addPhotoCreator(url))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ImageInputContainer)