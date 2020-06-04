import React, {useState} from 'react'

const ImageInput = props => {
    return (
        <div>
            <form>
                <input type="file" onChange={(e) => props.downloadImage(e)}/>
                {props.postImage
                    ? <img style={{width: '100%'}} src={props.postImage} alt="image tag"/>
                    : null}
            </form>
        </div>
    )
}

export default ImageInput