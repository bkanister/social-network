import React, {useEffect} from 'react'
import classes from '../Post/Post.module.css'
import {deletePostCreator, downloadPostsCreator} from "../../redux/reducers/reducers";
import {AvatarContext} from "../../context";


const Post = props => {
    return (
        <AvatarContext.Consumer>
            {
                value => {
                    return (
                        <div className={classes.Post}>
                            <div className={classes.postContent}>
                                <img className={classes.avatar} src={value.avatar} alt="Avatar"/>
                                <div>
                                    <p className={classes.postText}>{props.post.body}</p>
                                    {props.post.img ? <p><img className={classes.postImg} src={props.post.img} alt=""/></p> : null}
                                </div>
                                <button onClick={() => props.dispatch(deletePostCreator(props.post.key))}>&times;</button>
                            </div>
                            <footer>
                                <p>{props.post.date}</p>
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