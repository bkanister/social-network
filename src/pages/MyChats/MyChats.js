import React from 'react'
import classes from '../MyChats/MyChats.module.css'
import {withAuth} from "../../components/AuthenticationPage/withAuth";

const MyChats = props => {
    const messages = props.messages.map(message => {
        return (
            <div className={classes.MyChats}>
                <img src="https://cdn4.iconfinder.com/data/icons/jetflat-2-faces-2/60/005b_042_user_profile_avatar_man_boy_round-512.png" alt="Avatar"/>
                <div>
                    <p>{message.userId}</p>
                    <p>{message.body}</p>
                </div>
            </div>
        )
    })

    return (
        <div>
            <h1>My chats</h1>
            {messages}
        </div>

    )
}

export default withAuth(MyChats)