import React, {useEffect} from "react";
import classes from '../UsersProfile/UsersProfile.module.css'
import {withRouter} from "react-router-dom";
import {getUserProfile} from "../../firebase/firebaseRequests";
import NewPostCreator from "../NewPostCreator/NewPostCreator";
import Posts from "../Posts/Posts";
import withAuth from "../AuthenticationPage/withAuth";

const MainContent = props => {
    return (
        <div className='main'>
            <NewPostCreator/>
            <Posts/>
        </div>
    )
}


export default withAuth(withRouter(MainContent))
