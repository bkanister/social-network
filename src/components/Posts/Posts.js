import React, {useEffect} from 'react'
import classes from '../Posts/Posts.module.css'
import Post from "../Post/Post";
import {getPosts} from "../../firebase/firebaseRequests";

const Posts = props => {
    useEffect(() => {
        getPosts(props.dispatch, props.userID, props.posts)
    },[props.posts])
        return (
            <div className={classes.Posts}>
                {props.posts.map(post => <Post key={post.key} post={post} dispatch={props.dispatch}/>)}
            </div>
        )
}

export default Posts