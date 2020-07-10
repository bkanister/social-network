import React from 'react'
import RecentContacts from "./RecentContacts/RecentContacts";
import styled from 'styled-components'

const PeopleYouMayKnowBlock = styled.aside`
  background: white;
  border-radius: 7px;
  box-shadow: 0 0 15px -5px rgba(0,0,0,0.16);
`

const Header = styled.header`
  padding: 10px 5px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
`


const ChatList = props => {
    return (
        <PeopleYouMayKnowBlock className='sidebar'>
            <Header>People you may know</Header>
            <RecentContacts users={props.users} avatar={props.avatar}/>
        </PeopleYouMayKnowBlock>
    )
}

export default ChatList