import React, {useState} from 'react'

const ImageInput = props => {
    return (
        <div>
            <form onSubmit={(e) => props.handleFireBaseUpload(e)}>
                <input type="file" onChange={(e) => props.handleImageAsFile(e)}/>
                <button type="submit">Upload</button>
                {props.postImage
                    ? <img style={{width: '100%'}} src={props.postImage} alt="image tag"/>
                    : null}
            </form>
        </div>
    )
}

export default ImageInput