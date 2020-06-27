import {SET_USER_AVATAR, SET_USER_ID, SET_USER_NAME, SET_USER_STATUS} from "../constants";
import {Dispatch} from "redux";

export type InitialStateType = {
    userID: string
    firstName: string
    userStatus: string
    avatar?: string
}
export type ActionTypes = SetUserIdType | SetUserStatusType | SetUserNameType | setUserAvatarType

type SetUserIdType = ({type: typeof SET_USER_ID, payload: string})
type SetUserStatusType = ({type: typeof SET_USER_STATUS, payload: string})
type SetUserNameType = ({type: typeof SET_USER_NAME, payload: string})
type setUserAvatarType = ({type: typeof SET_USER_AVATAR, payload: string})

export type DispatchType = Dispatch<ActionTypes>


