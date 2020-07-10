import {DOWNLOAD_USERS} from "./constants";
import {auth, firestore} from "../../firebase/firebase";

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
                    if (doc.id !== auth.currentUser.uid) {
                        users.push(doc.data());
                    }
                });
                dispatch(downloadUsersCreator(users))
            })
    }

export default usersReducer