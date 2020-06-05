import React from 'react'

const MyFriends = props => {
    const pageCount = Math.ceil(props.users.length / 20)
    const pageNumbers = []
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <div>
                {pageNumbers.map(pageNumber => <span key={pageNumber}>{pageNumber}</span>)}
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
        </div>
    )
}

export default MyFriends