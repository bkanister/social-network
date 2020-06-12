import React from 'react'
import {storage} from "../../firebase/firebase";
import ImageInput from "./ImageInput";
import {addPhotoCreator} from "../../redux/reducers/postsReducer";
import {connect} from "react-redux";

const ImageInputContainer = props => {

    const downloadImage = (e) => {
        return new Promise((resolve, reject) => {
            const image = e.target.files[0]
            if (image) {
                resolve(image)
            } else {
                let error = new Error('something went wrong')
                reject(error)
            }
        }).then(image => handleFireBaseUpload(image))
    }

    const handleFireBaseUpload = (image) => {
        const uploadTask = storage.ref(`/images/${image.name}`).put(image)
        uploadTask.on('state_changed',
            (snapShot) => {
                console.log(snapShot)
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('images').child(image.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        props.addPhoto(fireBaseUrl)
                    })
        })
    }

    return <ImageInput
                downloadImage={downloadImage}
                postImage={props.postImage}
            />
}

const mapStateToProps = state => {
    return {
        postImage: state.posts.postImage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPhoto: (url) => dispatch(addPhotoCreator(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageInputContainer)