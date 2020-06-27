import React, {useEffect} from 'react'
import classes from '../Posts/Posts.module.css'
import Post from "../Post/Post";
import {getPostsThunkAC} from "../../redux/reducers/posts/postsReducer";
import {connect, ConnectedProps} from "react-redux";
import {StoreType} from "../../redux/reduxStore";
import {PostType} from "../../redux/reducers/posts/types";

type Props = PropsFromRedux

const Posts = ({posts, getPosts}: Props) => {
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className={classes.Posts}>
            {posts.map((post: PostType) => (
                <Post key={post.key} post={post}/>
                )
            )}
        </div>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        posts: state.posts.posts
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getPosts: () => dispatch(getPostsThunkAC())
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Posts)