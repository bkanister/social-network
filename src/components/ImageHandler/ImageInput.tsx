import React, {ChangeEvent} from 'react'

type Props = {
    postImage: string
    downloadImage: (e: ChangeEvent<HTMLInputElement>) => void
}

const ImageInput = ({postImage, downloadImage}: Props) => {

    const downloadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        downloadImage(e)
        e.target.value = ''
    }

    return (
        <>
            <input type="file" name='image' onChange={(e) => downloadImageHandler(e)}/>
            {
                postImage
                ? <img style={{width: '100%'}} src={postImage} alt=""/>
                : null
            }
        </>
    )
}

export default ImageInput