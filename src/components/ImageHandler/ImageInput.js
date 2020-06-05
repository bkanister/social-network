import React from 'react'

const ImageInput = props => {
    return (
        <div>
            <form>
                <input type="file" onChange={(e) => props.downloadImage(e)}/>
                {props.postImage
                    ? <img style={{width: '100%'}} src={props.postImage} alt=""/>
                    : null}
            </form>
        </div>
    )
}

export default ImageInput