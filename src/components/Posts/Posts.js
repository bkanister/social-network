import React from 'react'
import classes from '../Posts/Posts.module.css'
import Post from "../Post/Post";

const Posts = props => {
    return (
        <div className={classes.Posts}>
            {props.posts.map(post => <Post key={post.id} post={post} avatar={props.avatar} postId={post.id} deletePost={props.deletePost}/>)}
        </div>

    )
}

export default Posts