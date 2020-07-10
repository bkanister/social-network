import React, {ChangeEvent} from 'react'
import {handleFireBaseImageUpload} from "../../firebase/firebaseRequests";
import {ReactComponent as ChangeAvatarIcon} from "../../icons/mugshot.svg";
import {InvisibleFileInput} from "../ImageHandler/PostImageForm";


const ChangeAvatarForm = () => {
    const downloadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        return new Promise((resolve, reject) => {
            const image: File  = e.target.files![0]
            if (image) {
                resolve(image)
            } else {
                let error = new Error('something went wrong')
                reject(error)
            }
        }).then(image => handleFireBaseImageUpload(image as File, 'profile'))
    }

    return (
        <>
            <InvisibleFileInput type="file" id='avatarInput'
                                name='avatarInput'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => downloadAvatar(e)}/>
            <label htmlFor="avatarInput">
                <ChangeAvatarIcon/> Click to change avatar
            </label>
        </>

    )
}

export default ChangeAvatarForm