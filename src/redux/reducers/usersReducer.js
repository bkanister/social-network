import {
    DOWNLOAD_USERS,
    SET_CURRENT_PAGE_NUMBER, USERS_ARE_LOADING
} from "./constants";
import {auth, firestore} from "../../firebase/firebase";
import {PostType} from "./posts/types";
import {downloadPostsCreator} from "./posts/postsReducer";

const initialState = {
    defaultUserAvatar: 'https://art.pixilart.com/1f127be4c0f2913.png',
    users: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case DOWNLOAD_USERS:
                return {
                    ...state,
                    users: action.payload
                }

        default: return state
    }
}

export const downloadUsersCreator = (users) => ({type: DOWNLOAD_USERS, payload: users})

export const getUsersThunkAC = () => dispatch => {
        firestore.collection("users").get()
            .then(function (querySnapshot) {
                const users = []
                querySnapshot.forEach(function (doc) {
                    users.push(doc.data());
                });
                dispatch(downloadUsersCreator(users))
            })
    }

export default usersReducer