import React, {useState} from 'react'
import storage from "../../firebase/firebase";
import ImageInput from "./ImageInput";

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
        }).then((image) => handleFireBaseUpload(image))
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
                        props.dispatch({type: 'ADD_PHOTO', payload: fireBaseUrl}) //dispatching action
                    })
        })
    }

    return <ImageInput
                downloadImage={downloadImage}
                postImage={props.postImage}
            />
}


export default ImageInputContainer