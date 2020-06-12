import Profile from "../../components/MyProfile/Profile";
import NewPostCreator from "../../components/NewPostCreator/NewPostCreator";
import Posts from "../../components/Posts/Posts";
import React from "react";
import {withAuth} from "../../components/AuthenticationPage/withAuth";

const MyProfile = props => {
    return (
        <div style={{flexGrow: 1}}>
            <Profile/>
            <NewPostCreator/>
            <Posts dispatch={props.dispatch} posts={props.posts} userID={props.userID}/>
        </div>
    )
}

export default withAuth(MyProfile)