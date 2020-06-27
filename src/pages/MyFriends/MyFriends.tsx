import React, {FC} from 'react'


type User = {
    email: string
    firstName: string
    lastName: string
    status: string
}

type Props = {
    users: Array<User>
    avatar: string
}




const MyFriends = ({users, avatar}: Props) => {

    return (
        <div>
            {users.map((user: User) => (
                    <div>
                        <img style={{width: 40}} src={avatar} alt=""/>
                        <p>{user.email}</p>
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                        <p>{user.status}</p>
                    </div>
                ))
            }
        </div>
    )
}
// const mapStateToProps = (state: StoreType) => {
//     return {
//         users: state.users.users
//     }
// }

export default MyFriends
// connect(mapStateToProps, null)(MyFriends)