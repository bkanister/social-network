import {SET_USER_NAME, SET_USER_ID, SET_USER_STATUS} from "./constants";
import {auth, firestore} from "../../firebase/firebase";
import * as firebase from "firebase/app"



const initialState: InitialStateType = {
    userID: '',
    firstName: '',
    userStatus: ''
}

type InitialStateType = {
    userID: string
    firstName: string
    userStatus: string
}

const usersCollection = firestore.collection('users')

const profileReducer = (state = initialState, action: any) => {
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

        default: return state
    }
}


type SetUserIdType = (userId: string) => ({type: typeof SET_USER_ID, payload: string})
export const setUserId: SetUserIdType = (userId: string) => ({type: SET_USER_ID, payload: userId})

type SetUserStatusType = (status: string) => ({type: typeof SET_USER_STATUS, payload: string})
export const setUserStatus: SetUserStatusType = (status: string) => ({type: SET_USER_STATUS, payload: status})

type SetUserNameType = (firstName: string) => ({type: typeof SET_USER_NAME, payload: string})
export const setUserName: SetUserNameType  = (firstName: string)=> ({type: SET_USER_NAME, payload: firstName})

export const signInThunkAC = (email: string, password: string) => (dispatch: any) => {
         firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
               return firebase.auth().signInWithEmailAndPassword(email, password)
                   .then((response) => {
                    console.log(response)
                    // @ts-ignore
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

export const signUpThunkAC = (firstName: string, lastName: string, email: string, password: string) => (dispatch: any) => {
    debugger
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                            // @ts-ignore
                        usersCollection.doc(auth.currentUser.uid).set({
                                firstName,
                                lastName,
                                email
                            })
                            // @ts-ignore
                        dispatch(setUserId(auth.currentUser.uid))
                    }
                });
            })
}

export const updateStatusThunkAC = (value: string) => (dispatch: any) => {
    dispatch(setUserStatus(value))
    // @ts-ignore
    usersCollection.doc(auth.currentUser.uid)
        .update({
            status: value
        })
        .catch(error => console.log(error));
}

export const getUserStatusThunkAC = () => async (dispatch: any) => {
        // @ts-ignore
    const response = await usersCollection.doc(auth.currentUser.uid).get()
            if (response.exists) {
                // @ts-ignore
                dispatch(setUserStatus(response.data().status))
            }
}

export const getUserNameThunkAC = () => async (dispatch: any) => {
        // @ts-ignore
    const response = await usersCollection.doc(auth.currentUser.uid).get()
            if (response.exists) {
                console.log(response.data())
                // @ts-ignore
                dispatch(setUserName(response.data().firstName))
            }
}

export default profileReducer