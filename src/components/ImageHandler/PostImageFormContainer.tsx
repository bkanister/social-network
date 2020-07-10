import React, {ChangeEvent, FC} from 'react'
import PostImageForm from "./PostImageForm";
import {handleFireBaseImageUpload} from "../../firebase/firebaseRequests";

type Props = {
    exactPath: string
}

const PostImageFormContainer = ({exactPath}: Props) => {
    const downloadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        debugger
        const image_1 = await new Promise((resolve, reject) => {
            const image: File = e.target.files![0];
            if (image) {
                resolve(image);
            } else {
                let error = new Error('something went wrong');
                reject(error);
            }
        });
        return handleFireBaseImageUpload((image_1 as File), exactPath);
    }

    return (
        <PostImageForm downloadImage={downloadImage}/>
        )
}

export default PostImageFormContainer