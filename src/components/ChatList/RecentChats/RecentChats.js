import React from 'react'
import classes from '../RecentChats/RecentChats.module.css'

const RecentChats = props => {
    return (
        <div className={classes.RecentChats}>
            <div className={classes.chat}>
                <img src="https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-8-300x300.png" alt=""/>
                <div>
                    <p>Name</p>
                    <p>Message text</p>
                </div>
            </div>
            <div className={classes.chat}>
                <img src="https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-8-300x300.png" alt=""/>
                <div>
                    <p>Name</p>
                    <p>Message text</p>
                </div>
            </div>
        </div>
    )
}

export default RecentChats