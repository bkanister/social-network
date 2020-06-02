import React from 'react'
import classes from '../Navbar/Navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = props => {
    return (
        <aside className={classes.Navbar}>
            <header className={classes.logo}>Social network</header>
            <hr/>
            <section className={classes.navLinks}>
                <NavLink exact to={'/'} activeClassName={classes.active}>My profile</NavLink>
                <NavLink to={'/my-friends'} activeClassName={classes.active}>My friends</NavLink>
                <NavLink to={'/my-chats'} activeClassName={classes.active}>My chats</NavLink>
                <NavLink to={'/my-tasks'} activeClassName={classes.active}>My tasks</NavLink>
                <NavLink to={'/news'} activeClassName={classes.active}>News</NavLink>
                <NavLink to={'/settings'} activeClassName={classes.active}>Settings</NavLink>
            </section>
        </aside>

    )
}

export default Navbar