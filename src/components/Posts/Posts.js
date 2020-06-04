import React from 'react'
import classes from '../Posts/Posts.module.css'
import Post from "../Post/Post";

const Posts = props => {
        return (
            <div className={classes.Posts}>
                {props.posts.map(post => <Post key={post[0].key} postKey={post[0].key} id={post[0].id} post={post[0]} dispatch={props.dispatch}/>)}
            </div>
        )
}

export default Posts