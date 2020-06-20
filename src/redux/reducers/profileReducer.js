import {SET_USER_NAME, SET_USER_ID, SET_USER_STATUS} from "./constants";
import {auth, firestore} from "../../firebase/firebase";
import * as firebase from "firebase/app"

const initialState = {
    userID: '',
    userName: '',
    userStatus: ''
}

const usersCollection = firestore.collection('users')

const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_ID:
            console.log(SET_USER_ID)
            return {
                ...state,
                userID: action.payload
            }

        case SET_USER_NAME:
            console.log(SET_USER_NAME)
            return {
                ...state,
                userName: action.payload
            }

        case SET_USER_STATUS:
            console.log(SET_USER_STATUS)
            return {
                ...state,
                userStatus: action.payload
            }

        default: return state
    }
}


export const setUserId = (userId) => ({type: SET_USER_ID, payload: userId})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, payload: status})
export const getUserName = (name) => ({type: SET_USER_NAME, payload: name})

export const signInThunkAC = (email, password) => dispatch => {
         firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
               return firebase.auth().signInWithEmailAndPassword(email, password)
                   .then((response) => {
                    console.log(response)
                    dispatch(setUserId(auth.currentUser.uid))
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

export const signUpThunkAC = (name, email, password) => dispatch => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                            usersCollection.doc(auth.currentUser.uid).set({
                                name,
                                email
                            })
                            dispatch(setUserId(auth.currentUser.uid))
                    }
                });
            })
}

export const updateStatusThunkAC = value => dispatch => {
    dispatch(setUserStatus(value))
    usersCollection.doc(auth.currentUser.uid)
        .update({
            status: value
        })
        .catch(error => console.log(error));
}

export const getUserStatusThunkAC = () => async dispatch => {
        const response = await usersCollection.doc(auth.currentUser.uid).get()
            if (response.exists) {
                dispatch(setUserStatus(response.data().status))
            }
}

export const getUserNameThunkAC = () => async dispatch => {
        const response = await usersCollection.doc(auth.currentUser.uid).get()
            if (response.exists) {
                dispatch(getUserName(response.data().name))
            }
}

export default profileReducer