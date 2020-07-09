import Profile from "../../components/Profile/Profile";
import NewPostCreator from "../../components/NewPostCreator/NewPostCreator";
import Posts from "../../components/Posts/Posts";
import React from "react";

const MyProfile = props => {
    return (
        <div style={{flexGrow: 1}}>
            <Profile avatar={props.avatar}/>
            <NewPostCreator dispatch={props.dispatch}
                            textareaValue={props.textareaValue}/>
            <Posts dispatch={props.dispatch} posts={props.posts} avatar={props.avatar}/>
        </div>
    )
}

export default MyProfile