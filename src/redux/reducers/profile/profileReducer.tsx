import {SET_USER_NAME, SET_USER_ID, SET_USER_STATUS, SET_USER_AVATAR} from "../constants";
import {auth, firestore} from "../../../firebase/firebase";
import * as firebase from "firebase/app"
import {InitialStateType, ActionTypes} from "./types";
import {DispatchType} from "../profile/types";

const initialState: InitialStateType = {
    userID: '',
    firstName: '',
    userStatus: '',
    avatar: ''
}
const usersCollection = firestore.collection('users')

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case SET_USER_ID:
            return {
                ...state,
                userID: action.payload
            }

        case SET_USER_NAME:
            return {
                ...state,
                firstName: action.payload
            }

        case SET_USER_STATUS:
            return {
                ...state,
                userStatus: action.payload
            }

        case SET_USER_AVATAR:
            return {
                ...state,
                avatar: action.payload
            }

        default: return state
    }
}


export const setUserId = (userId: string): ActionTypes => ({type: SET_USER_ID, payload: userId})
export const setUserStatus= (status: string): ActionTypes  => ({type: SET_USER_STATUS, payload: status})
export const setUserName = (firstName: string): ActionTypes => ({type: SET_USER_NAME, payload: firstName})
export const setUserAvatar = (avatar: string): ActionTypes => ({type: SET_USER_AVATAR, payload: avatar})



export const signInThunkAC = (email: string, password: string) => (dispatch: DispatchType) => {
         firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
               return firebase.auth().signInWithEmailAndPassword(email, password)
                   .then((response) => {
                       dispatch(setUserId(auth.currentUser!.uid))
                })
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                        errorCode === 'auth/wrong-password'
                            ? alert('Wrong password')
                            : alert(errorMessage);
                        console.log(error);
            });
}
export const signUpThunkAC = (firstName: string, lastName: string, email: string, password: string) => (dispatch: DispatchType) => {
    debugger
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        usersCollection.doc(auth.currentUser!.uid).set({
                                firstName,
                                lastName,
                                email
                            })
                        dispatch(setUserId(auth.currentUser!.uid))
                    }
                });
            })
}


export const updateStatusThunkAC = (value: string) => (dispatch: DispatchType) => {
    dispatch(setUserStatus(value))
    usersCollection.doc(auth.currentUser!.uid)
        .update({
            status: value
        })
        .catch(error => console.log(error));
}
export const getUserStatusThunkAC = () => async (dispatch: DispatchType) => {
    const response = await usersCollection.doc(auth.currentUser!.uid).get()
            if (response.exists) {
                dispatch(setUserStatus(response.data()!.status))
            }
}


export const getUserAvatarThunkAC = () => async (dispatch: DispatchType) => {
    const response = await usersCollection.doc(auth.currentUser!.uid).get()
            if (response.exists) {
                dispatch(setUserAvatar(response.data()!.avatar))
            }
}
export const updateUserAvatarThunkAC = (value: string) => (dispatch: DispatchType) => {
    dispatch(setUserAvatar(value))
    usersCollection.doc(auth.currentUser!.uid)
        .update({
            avatar: value
        })
        .catch(error => console.log(error));
}


export const getUserNameThunkAC = () => async (dispatch: DispatchType) => {
    const response = await usersCollection.doc(auth.currentUser!.uid).get()
            if (response.exists) {
                dispatch(setUserName(response.data()!.firstName))
            }
}

export default profileReducer