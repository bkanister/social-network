import {ADD_PHOTO, ADD_POST, DELETE_POST, DOWNLOAD_POSTS} from "../constants";

type AddPostCreatorType = ({type: typeof ADD_POST, payload: PostType})
type DeletePostCreatorType = ({type: typeof DELETE_POST, payload: string})
type DownloadPostsCreatorType = ({type: typeof DOWNLOAD_POSTS, payload: PostType[]})
type AddPhotoCreatorType = ({type: typeof ADD_PHOTO, payload: string})

export type InitialStateType = {
    avatar: string
    posts: PostType[]
    textareaValue: string
    postImage: string
    postsAreLoading: boolean
}
export type PostType = {
    key: string
    body: string
    img: string
    date: string
    timestamp: number
}
export type ActionTypes = AddPostCreatorType | DeletePostCreatorType |
    DownloadPostsCreatorType | AddPhotoCreatorType