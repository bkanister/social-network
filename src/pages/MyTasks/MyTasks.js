import React from 'react'
import {withAuth} from "../../components/AuthenticationPage/withAuth";

const MyTasks = props => {
    return <div>
        <h1>My tasks</h1>
    </div>
}

export default withAuth(MyTasks)