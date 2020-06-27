import {GET_ALL_MESSAGES, RECIEVE_MESSAGE, SEND_MESSAGE} from "../constants";
import {ActionTypes, DispatchType, InitialStateType, MessageType, GetStateType} from "./types";
import {db} from "../../../firebase/firebase";


const initialState: InitialStateType = {
    messages: []
}

const chatReducer = (state = initialState, action: ActionTypes) => {
    switch(action.type) {
        case RECIEVE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case GET_ALL_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        default: return state
    }
}


export const recieveMessageCreator = (message: MessageType): ActionTypes => ({type: RECIEVE_MESSAGE, payload: message})
export const sendMessageCreator = (message: MessageType): ActionTypes => ({type: SEND_MESSAGE, payload: message})
export const getALLMessagesCreator = (messages: MessageType[]): ActionTypes => ({type: GET_ALL_MESSAGES, payload: messages})


export const sendMessageThunkAC = (message: string) => (dispatch: DispatchType, getState: GetStateType) => {
    const newMessage: MessageType = {
        name: getState().profile.firstName,
        message,
        date: Date.now()
    }
        db.ref("chats").push(newMessage);
    dispatch(sendMessageCreator(newMessage))
}

export const recieveMessageThunkAC = () => (dispatch: DispatchType) => {
    db.ref("chats").on("child_added", data => {
        if (data) {
            dispatch(recieveMessageCreator(data.val()))
        }
    });
}

export const getMessagesOnceThunkAC = () => (dispatch: DispatchType) => {
    db.ref("chats").once('value').then(snapshot => {
        let chats: any = [];
        snapshot.forEach((snap) => {
            chats.push(snap.val());
        });
        dispatch(getALLMessagesCreator(chats))
    })
}

export default chatReducer