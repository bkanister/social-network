import React from 'react'
import classes from '../RecentContacts/RecentContacts.module.css'

const RecentContacts = props => {
    const contacts = props.users.map((user, index) => {
        return (
                <span key={index} >
                    <img src={user.picture['thumbnail']} alt="Avatar"/>
                </span>
        )
    })
    return (
        <div className={classes.RecentContacts}>
            {contacts}
        </div>
    )
}

export default RecentContacts