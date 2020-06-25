import React, {ChangeEvent} from 'react'

type Props = {
    postImage: string
    downloadImage: (e: ChangeEvent<HTMLInputElement>) => void
}

const ImageInput = ({postImage, downloadImage}: Props) => {
    return (
        <>
            <input type="file" onChange={(e) => downloadImage(e)}/>
            {postImage
                ? <img style={{width: '100%'}} src={postImage} alt=""/>
                : null}
        </>
    )
}

// @ts-ignore
export default ImageInput