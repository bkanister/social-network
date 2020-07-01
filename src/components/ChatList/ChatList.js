import React from 'react'
import RecentContacts from "./RecentContacts/RecentContacts";
import RecentChats from "./RecentChats/RecentChats";



const ChatList = props => {
    return (
        <aside className='sidebar'>
            <header>Chat list</header>
            <hr/>
            <RecentContacts users={props.users} avatar={props.avatar}/>
            <hr/>
            <RecentChats users={props.users} avatar={props.avatar}/>
            <button>+ New chat</button>
        </aside>
    )
}

export default ChatList