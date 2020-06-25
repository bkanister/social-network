import {SET_USER_ID, SET_USER_NAME, SET_USER_STATUS} from "../constants";

export type InitialStateType = {
    userID: string
    firstName: string
    userStatus: string
}
export type ActionTypes = SetUserIdType | SetUserStatusType | SetUserNameType

type SetUserIdType = ({type: typeof SET_USER_ID, payload: string})
type SetUserStatusType = ({type: typeof SET_USER_STATUS, payload: string})
type SetUserNameType = ({type: typeof SET_USER_NAME, payload: string})

