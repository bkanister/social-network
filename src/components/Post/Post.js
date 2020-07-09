import React from 'react'
import classes from '../Post/Post.module.css'

const Post = props => {
    return (
        <div className={classes.Post}>
            <div className={classes.postContent}>
                <img src={props.avatar} alt="Avatar"/>
                <p className={classes.postText}>{props.post.body}</p>
                <button onClick={() => props.dispatch({type: 'DELETE_POST', postId: props.postId})}>&times;</button>
            </div>
            <footer>
                <p>{new Date().toLocaleString()}</p>
                <p>10 Likes</p>
            </footer>
        </div>

    )
}

export default Post