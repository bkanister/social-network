import React from 'react'
import {NavLink} from "react-router-dom";
import styled from 'styled-components'
import {ReactComponent as HomeIcon} from '../../icons/home.svg'
import {ReactComponent as PeopleIcon} from '../../icons/people.svg'
import {ReactComponent as ChatIcon} from '../../icons/chat.svg'
import {ReactComponent as TaskIcon} from '../../icons/property.svg'
import {ReactComponent as NewsIcon} from '../../icons/globe.svg'
import {ReactComponent as SettingsIcon} from '../../icons/cog.svg'

//styles
const Header = styled.header`
    background: white;
    height: 12vh;
    width: 100%;
    display: grid;
    flex-direction: row;
    grid-template-columns: 2fr 8fr 2fr;
`;
const Logo = styled.div`
    margin: auto;
`;
const Navbar = styled.nav`
    margin: auto;
`
const StyledNavLink = styled(NavLink)`
    margin-right: 45px;
    text-decoration: none;
    color: #434F57;
    font-weight: 500;
    font-size: 14px;
    
    &.active {
        text-decoration: underline;
    }
    
    .icon {
        position: relative;
        top: 2px;
        right: 4px;
    }
`

const Navigation = () => {
    return (
        <Header className='navigation'>
            <Logo>LOGO</Logo>
            <Navbar>

                <StyledNavLink exact to={'/'}>
                    <HomeIcon/>
                    <span>&nbsp;My profile</span>
                </StyledNavLink>

                <StyledNavLink to={'/my-friends'}>
                    <PeopleIcon/>
                    &nbsp;My friends
                </StyledNavLink>

                <StyledNavLink to={'/my-chats'}>
                    <ChatIcon/>
                    &nbsp;My chats
                </StyledNavLink>

                <StyledNavLink to={'/my-tasks'}>
                    <TaskIcon/>
                    &nbsp;My tasks
                </StyledNavLink>

                <StyledNavLink to={'/news'}>
                    <NewsIcon/>
                    &nbsp;News
                </StyledNavLink>

                <StyledNavLink to={'/settings'}>
                    <SettingsIcon/>
                    &nbsp;Settings
                </StyledNavLink>

            </Navbar>
            <Logo>LOGO</Logo>
        </Header>

    )
}

export default Navigation