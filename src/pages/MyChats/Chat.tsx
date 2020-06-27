import React from 'react'
import {MessageType} from '../../redux/reducers/chats/types'



const Chat = ({name, message, image, date}: MessageType) => {
    return (
        <div style={{borderBottom: '1px solid black'}}>
            <header>
                <p>{name}</p>
                <p>{date}</p>
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
        </div>
    )
}

export default Chat