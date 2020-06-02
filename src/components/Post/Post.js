import React from 'react'
import classes from '../Post/Post.module.css'
import {deletePostCreator} from "../../redux/reducers/reducers";
import {AvatarContext} from "../../context";


const Post = props => {
    return (
        <AvatarContext.Consumer>
            {
                value => {
                    return (
                        <div className={classes.Post}>
                            <div className={classes.postContent}>
                                <img src={value} alt="Avatar"/>
                                <p className={classes.postText}>{props.post.body}</p>
                                <button onClick={() => props.dispatch(deletePostCreator(props.postId))}>&times;</button>
                            </div>
                            <footer>
                                <p>{new Date().toLocaleString()}</p>
                                <p>10 Likes</p>
                            </footer>
                        </div>
                    )
                }
            }

        </AvatarContext.Consumer>
    )
}

export default Post