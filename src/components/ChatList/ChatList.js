import React from 'react'
import classes from '../ChatList/ChatList.module.css'
import RecentContacts from "./RecentContacts/RecentContacts";
import RecentChats from "./RecentChats/RecentChats";

const ChatList = props => {
    return (
        <aside className={classes.ChatList}>
            <header>Chat list</header>
            <hr/>
            <RecentContacts users={props.users}/>
            <hr/>
            <RecentChats/>
            <button>+ New chat</button>
        </aside>
    )
}

export default ChatList