import React from 'react'
import classes from '../Post/Post.module.css'
import {deletePostThunkAC} from "../../redux/reducers/postsReducer";
import {connect} from "react-redux";


const Post = props => {
    return (
        <div className={classes.Post}>
            <div className={classes.postContent}>
                <img className={classes.avatar} src={props.avatar} alt="Avatar"/>
                <div>
                    <p className={classes.postText}>{props.post.body}</p>
                    {props.post.img ? <p><img className={classes.postImg} src={props.post.img} alt=""/></p> : null}
                </div>
                <button onClick={() => props.deletePost(props.post.key)}>&times;</button>
            </div>
            <footer>
                <p>{props.post.date}</p>
                <p>10 Likes</p>
            </footer>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        avatar: state.posts.avatar
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletePost: (postKey) => {
            dispatch(deletePostThunkAC(postKey))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)