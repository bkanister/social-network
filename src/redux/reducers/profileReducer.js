import {SET_USER_EMAIL, SET_USER_ID, SET_USER_NAME, SET_USER_PASSWORD} from "./constants";
import {auth, firestore} from "../../firebase/firebase";
import * as firebase from "firebase/app"

const initialState = {
    userID: '',
    userName: '',
    userEmail: '',
    userPassword: ''
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_ID:
            console.log('SET_USER_ID')
            return {
                ...state,
                userID: action.payload
            }

        case SET_USER_NAME:
            console.log('SET_USER_NAME')
            return {
                ...state,
                userName: action.payload
            }

        case SET_USER_EMAIL:
            console.log('SET_USER_EMAIL')
            return {
                ...state,
                userEmail: action.payload
            }

        case SET_USER_PASSWORD:
            console.log('SET_USER_PASSWORD')
            return {
                ...state,
                userPassword: action.payload
            }

        default: return state
    }
}


export const setUserId = (userId) => ({type: SET_USER_ID, payload: userId})
export const setUserName = (userName) => ({type: SET_USER_NAME, payload: userName})
export const setUserEmail = (userEmail) => ({type: SET_USER_EMAIL, payload: userEmail})
export const setUserPassword = (userPassword) => ({type: SET_USER_PASSWORD, payload: userPassword})

export const signInThunkAC = (email, password) => {
    console.log('signInThunkAC')
    return (dispatch) => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
                return firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
                    console.log(response)
                    dispatch(setUserId(auth.currentUser.uid))
                    localStorage.setItem('uid', auth.currentUser.uid)
                })
            })
            .catch(function(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                        errorCode === 'auth/wrong-password'
                            ? alert('Wrong password')
                            : alert(errorMessage);
                        console.log(error);
            });
    }
}

export const signUpThunkAC = (name, email, password) => {
    console.log('signUpThunkAC')
    return (dispatch) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((response) => {
                firestore.collection('users').doc(auth.currentUser.uid)
                    .set({
                        name,
                        email
                    })
                    .catch(function(error) {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                            errorCode === 'auth/weak-password'
                            ? alert('The password is too weak.')
                            : alert(errorMessage)
                        console.log(error);
                    });
                dispatch(setUserId(auth.currentUser.uid))
            })
    }
}

export default profileReducer