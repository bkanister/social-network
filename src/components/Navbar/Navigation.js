import React from 'react'
import {NavLink} from "react-router-dom";
import styled from 'styled-components'

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
    margin-right: 30px;
`

const Navigation = () => {
    return (
        <Header className='navigation'>
            <Logo>LOGO</Logo>
            <Navbar>
                <StyledNavLink exact to={'/'}>My profile</StyledNavLink>
                <StyledNavLink to={'/my-friends'}>My friends</StyledNavLink>
                <StyledNavLink to={'/my-chats'}>My chats</StyledNavLink>
                <StyledNavLink to={'/my-tasks'}>My tasks</StyledNavLink>
                <StyledNavLink to={'/news'}>News</StyledNavLink>
                <StyledNavLink to={'/settings'}>Settings</StyledNavLink>
            </Navbar>
            <Logo>LOGO</Logo>
        </Header>

    )
}

export default Navigation