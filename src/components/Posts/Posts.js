import React, {useEffect} from 'react'
import classes from '../Posts/Posts.module.css'
import Post from "../Post/Post";
import {getPostsThunkAC} from "../../redux/reducers/postsReducer";

const Posts = props => {

    useEffect(() => {
        props.dispatch(getPostsThunkAC(props.userID))
    }, [props.posts])

    return (
        <div className={classes.Posts}>
            {props.posts.map(post => <Post key={post.key} post={post} dispatch={props.dispatch}/>)}
        </div>
    )
}

export default Posts