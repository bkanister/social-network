import React from 'react'
import {addPhotoCreator} from "../redux/reducers/reducers";

const ImageInput = props => {
    const imageInput = React.useRef(null)
    return (
        <div>
            <input ref={imageInput} type="file" onChange={() => props.dispatch(addPhotoCreator(imageInput.current.value))}/>
        </div>
    )
}

export default ImageInput