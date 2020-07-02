import React, {ChangeEvent, FC} from 'react'
import ImageInput from "./ImageInput";
import {connect} from "react-redux";
import {StoreType} from "../../redux/reduxStore";
import {handleFireBaseImageUpload} from "../../firebase/firebaseRequests";

interface Props {
    exactPath: string
    postImage?: any
}

const ImageInputContainer: FC<Props> = ({postImage, exactPath}) => {

    const downloadImage = (e: ChangeEvent<HTMLInputElement>) => {
        return new Promise((resolve, reject) => {
            const image: File  = e.target.files![0]
            if (image) {
                resolve(image)
            } else {
                let error = new Error('something went wrong')
                reject(error)
            }
        }).then(image => handleFireBaseImageUpload(image as File, exactPath))
    }

    return (
        <ImageInput downloadImage={downloadImage} postImage={postImage}/>
        )
}

const mapStateToProps = (state: StoreType) => {
    return {
        postImage: state.posts.postImage
    }
}

export default connect(mapStateToProps, null)(ImageInputContainer)