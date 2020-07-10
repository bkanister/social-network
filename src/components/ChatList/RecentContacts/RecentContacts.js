import React from 'react'
import styled from 'styled-components'
import {SmallPhoto} from "../../../universalStyleComponents/styled";

const Person = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px; 5px;
  border-bottom: 1px solid #cccccc;
`

const RecentContacts = props => {
    const contacts = props.users.map((user, index) => {
        return (
                <Person key={index} >
                    <SmallPhoto src={user.avatar || props.avatar} alt="Avatar"/>
                    <div>
                        <p>{`${user.firstName} ${user.lastName}`}</p>
                        <p>{user.status}</p>
                    </div>
                </Person>
        )
    })
    return (
        <div>
            {contacts}
        </div>
    )
}

export default RecentContacts