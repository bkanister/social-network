import React from 'react'
import classes from '../Navbar/Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = props => {
    return (
        <aside className={classes.Navbar}>
            <header className={classes.logo}>Social network</header>
            <hr/>
            <section className={classes.navLinks}>
                <NavLink to={'/'}>My profile</NavLink>
                <NavLink to={'/my-friends'}>My friends</NavLink>
                <NavLink to={'/my-chats'}>My chats</NavLink>
                <NavLink to={'/my-tasks'}>My tasks</NavLink>
                <NavLink to={'/news'}>News</NavLink>
                <NavLink to={'/settings'}>Settings</NavLink>
            </section>
        </aside>

    )
}

export default Navbar