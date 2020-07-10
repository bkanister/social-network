import React, {ChangeEvent} from 'react'
import {ReactComponent as ImageIcon} from '../../icons/media.svg'
import styled from 'styled-components'

type Props = {
    downloadImage: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InvisibleFileInput = styled.input`
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
`

const PostImageForm = ({downloadImage}: Props) => {
    const downloadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        downloadImage(e)
        e.target.value = ''
    }

    return (
        <>
            <InvisibleFileInput type='file' name='imageInput' id='imageInput'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => downloadImageHandler(e)}/>
            <label htmlFor="imageInput">
                <ImageIcon/>
            </label>
        </>
    )
}

// @ts-ignore
export default PostImageForm