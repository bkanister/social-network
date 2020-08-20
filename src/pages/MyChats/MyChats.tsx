import React, {useEffect, useRef} from 'react'
import Chat from "./Chat";
import NewMessageForm from "./NewMessageForm";
import {MessageType} from "../../redux/reducers/chats/types";
import {getMessagesOnceThunkAC} from '../../redux/reducers/chats/chatReducer';
import {useDispatch} from "react-redux";
import styled from 'styled-components';
import {auth} from "../../firebase/firebase";

type Props = {
    messages: MessageType[]
}

const ChatPage = styled.div`
  height: 70vh;
  overflow: scroll;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`

const MyChats = ({messages}: Props) => {
    const dispatch = useDispatch()
    const chatBottom = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        dispatch(getMessagesOnceThunkAC())
    }, [messages])

    useEffect(() => {
        chatBottom.current!.scrollIntoView()
    },[messages])

        return (
            <div>
                <ChatPage>
                    {messages.map(message => {
                        return <Chat key={`${message.date + Math.random()}`}
                                     name={message.name} message={message.message}
                                     date={message.date} uid={message.uid}/> //todo remove uid from here
                    })}
                    <div ref={chatBottom}/>
                </ChatPage>
                <NewMessageForm/>
            </div>
        )
}

export default MyChats