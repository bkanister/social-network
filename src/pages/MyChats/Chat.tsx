import React from 'react'
import {MessageType} from '../../redux/reducers/chats/types'
import styled from "styled-components";
import {auth} from "../../firebase/firebase";

const ChatDefaultStyle = styled.div`
  margin: 20px 10px;
  box-shadow: 5px 5px 7px 1px rgba(204,204,204,0.87);
  border-radius: 7px;
  width: 200px;
  display: flex;
  flex-direction: column;
`

const ChatBlockWhite = styled(ChatDefaultStyle)`
  background: white;
  align-self: flex-start;
`

const ChatBlockGreen = styled(ChatDefaultStyle)`
  background: #9DC3C0;
  align-self: flex-end;
  color: white;
`

const ChatBlock = (props: any) => {
    const uid = props.uid || null
    if (uid === auth.currentUser!.uid) {
        return <ChatBlockGreen>{props.children}</ChatBlockGreen>
    }
    return <ChatBlockWhite>{props.children}</ChatBlockWhite>
}

const Chat = ({name, message, image, date, uid}: MessageType) => {
    const dateObj = new Date(date * 1000);
    const hours = dateObj.getHours();
    const minutes = "0" + dateObj.getMinutes();
    const formattedTime = `${hours} : ${minutes.substr(-2)}`
    return (
        <ChatBlock uid={uid}>
            <header>
                <p>{name}</p>
                <p>{formattedTime}</p>
            </header>
            <main>
                <div>
                    {message}
                </div>
                {
                    image
                        ? <div><img src={image} alt=""/></div>
                        : null
                }
            </main>
        </ChatBlock>
    )
}

export default Chat