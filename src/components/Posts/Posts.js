import React, {useEffect} from 'react'
import classes from '../Posts/Posts.module.css'
import Post from "../Post/Post";
import {getPostsThunkAC} from "../../redux/reducers/posts/postsReducer";
import {connect} from "react-redux";

const Posts = props => {
    useEffect(() => {
        props.getPosts(props.userID)
    }, [])

    return (
        <div className={classes.Posts}>
            {props.posts.map(post => <Post key={post.key} post={post}/>)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userID: state.profile.userID,
        posts: state.posts.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: (userID) => dispatch(getPostsThunkAC(userID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)