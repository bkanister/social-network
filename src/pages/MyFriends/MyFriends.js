import React from 'react'
import {setCurrentPageNumberCreator} from "../../redux/reducers/usersReducer";
import Preloader from "../../components/Preloader/Preloader";

const MyFriends = props => {
    const pageCount = Math.ceil(props.users.length / 5)
    const pageNumbers = []
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i)
    }

    return (
        <>
            {props.usersAreLoading
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
                        <div key={user.name.last + index} style={{display: 'flex', marginBottom: 10}}>
                            <img style={{borderRadius: 50}} src={user.picture.medium} alt={''}/>
                            <div>
                                <p>{user.name.first} {user.name.last}</p>
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