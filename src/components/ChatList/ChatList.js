import React from 'react'
import RecentContacts from "./RecentContacts/RecentContacts";
import RecentChats from "./RecentChats/RecentChats";



const ChatList = props => {
    return (
        <aside className='sidebar'>
            <header>People you may know</header>
            <RecentContacts users={props.users} avatar={props.avatar}/>
        </aside>
    )
}

export default ChatList