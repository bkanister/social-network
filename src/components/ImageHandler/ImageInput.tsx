import React, {ChangeEvent} from 'react'

type Props = {
    postImage: string
    downloadImage: (e: ChangeEvent<HTMLInputElement>) => void
}

const ImageInput = ({postImage, downloadImage}: Props) => {
    return (
        <>
            <input type="file" src='https://mdn.mozillademos.org/files/2917/fxlogo.png'
                   width='50' name='image'
                   onChange={(e) => {
                downloadImage(e)
                e.target.value = '' // should add redux form instead of that solution
            }}/>
            {postImage
                ? <img style={{width: '100%'}} src={postImage} alt=""/>
                : null}
        </>
    )
}

export default ImageInput