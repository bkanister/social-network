import React from 'react'
import styled from 'styled-components'

const FriendsAvatar = styled.img`
    width: 50px;
    height: auto;
    border-radius: 50%;
`

const RecentChats = props => {
    const chats = props.users.map((user, index) => {
        return (
            <div key={index}>
                <FriendsAvatar src={props.avatar} alt=""/>
                <div>
                    <p>{user.name}</p>
                    <p>Message text</p>
                </div>
            </div>
        )
    });

    return (
        <div>
            {chats}
        </div>
    )
};

export default RecentChats