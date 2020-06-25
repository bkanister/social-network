import React from 'react'
import {setCurrentPageNumberCreator} from "../../redux/reducers/usersReducer";
import Preloader from "../../components/Preloader/Preloader";
import {NavLink} from "react-router-dom";
import withAuth from "../../components/AuthenticationPage/withAuth";

const MyFriends = props => {
    const pageCount = Math.ceil(props.totalUsersCount / 100)
    const pageNumbers = []
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            {props.isLoading
                ? <Preloader/>
                : <div>
                    <div>
                        {pageNumbers.map(pageNumber => <span key={pageNumber}
                                                             onClick={() => props.dispatch(setCurrentPageNumberCreator(pageNumber))}>
                                                    {pageNumber}
                                                </span>)}
                    </div>
                    {props.users.map((user, index) => {
                        return (
                            <div key={user.id} style={{display: 'flex', marginBottom: 10}}>
                                <NavLink to={`/profile/${user.id}`} onClick={() => props.dispatch({type: 'SET_CURRENT_USER_PROFILE', userId: user.id})}>
                                    <img style={{borderRadius: 50, height: 80, width: 80}} src={user.photos.large || props.avatar} alt={''}/>
                                </NavLink>
                                <div>
                                    <p>{user.name}</p>
                                    <p>Send a message</p>
                                </div>
                            </div>
                        )
                    })}
                </div>}
        </>
    )
}

export default MyFriends