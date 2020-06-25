import Profile from "../../components/MyProfile/Profile";
import Posts from "../../components/Posts/Posts";
import React from "react";
import withAuth from "../../components/AuthenticationPage/withAuth";
import NewPostCreator from "../../components/NewPostCreator/NewPostCreator";

const MyProfile = () => {
    return (
        <div style={{flexGrow: 1}}>
                <Profile/>
                <NewPostCreator/>
                <Posts/>
            </div>
    )
}

export default withAuth(MyProfile)