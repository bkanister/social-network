import {GET_ALL_MESSAGES, RECIEVE_MESSAGE, SEND_MESSAGE} from "../constants";
import {Dispatch} from "redux";
import {StoreType} from "../../reduxStore";

export type InitialStateType = {
    messages: MessageType[]
}

export type MessageType = {
    uid: string
    name: string
    message: string
    image?: string
    date: number
}

export type ActionTypes = sendMessageCreatorType | getALLMessagesCreatorType | recieveMessageType

export type getALLMessagesCreatorType = ({type: typeof GET_ALL_MESSAGES, payload: MessageType[]})

export type sendMessageCreatorType = ({type: typeof SEND_MESSAGE, payload: MessageType})
export type recieveMessageType = ({type: typeof RECIEVE_MESSAGE, payload: MessageType})

export type DispatchType = Dispatch<ActionTypes>
export type GetStateType = () => StoreType