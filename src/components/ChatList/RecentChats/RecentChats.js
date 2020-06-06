import React from 'react'
import classes from '../RecentChats/RecentChats.module.css'

const RecentChats = props => {
    const chats = props.users.map((user, index) => {
        return (
            <div key={index} className={classes.chat}>
                <img src={user.photos.small || props.avatar} alt=""/>
                <div>
                    <p>{user.name}</p>
                    <p>Message text</p>
                </div>
            </div>
        )
    });

    return (
        <div className={classes.RecentChats}>
            {chats}
        </div>
    )
};

export default RecentChats