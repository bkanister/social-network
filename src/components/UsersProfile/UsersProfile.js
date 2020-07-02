import React from "react";
import {withRouter} from "react-router-dom";
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
