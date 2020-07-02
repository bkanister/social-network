import React, {useEffect} from 'react'
import classes from '../MyChats/MyChats.module.css'
import Chat from "./Chat";
import NewMessageForm from "./NewMessageForm";
import {MessageType} from "../../redux/reducers/chats/types";
import {getMessagesOnceThunkAC} from '../../redux/reducers/chats/chatReducer';
import {useDispatch} from "react-redux";

type Props = {
    messages: MessageType[]
}

const MyChats = ({messages}: Props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMessagesOnceThunkAC())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages])


        return (
            <div className={classes.MyChats}>
                {messages.map(message => {
                    return <Chat key={`${message.date + Math.random()}`} name={message.name} message={message.message} date={message.date}/>
                })}
                <NewMessageForm/>
            </div>
        )
}

export default MyChats