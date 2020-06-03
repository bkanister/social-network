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
                                <img src={value.avatar} alt="Avatar"/>
                                <div>
                                    <p className={classes.postText}>{props.post.body}</p>
                                    {value.postImage ? <p><img src={value.postImage} alt=""/></p> : null}
                                </div>
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