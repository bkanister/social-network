import React from 'react'
import classes from '../Post/Post.module.css'

const Post = props => {
    return (
        <div className={classes.Post}>
            <div className={classes.postContent}>
                <img src="https://cdn.shortpixel.ai/client/q_lossless,ret_img/https://cdn.shortpixel.ai/client/q_lossless,ret_img,w_300/https://instamir.info/wp-content/uploads/2019/04/instami-avatarka-v-instagram-8-300x300.png" alt="Avatar"/>
                <p className={classes.postText}>{props.post.body}</p>
            </div>
            <footer>
                <p>{new Date().toLocaleString()}</p>
                <p>10 Likes</p>
            </footer>
        </div>

    )
}

export default Post