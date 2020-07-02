import React, {useEffect} from 'react'
import Post from "../Post/Post";
import {getPostsThunkAC} from "../../redux/reducers/posts/postsReducer";
import {connect, ConnectedProps} from "react-redux";
import {StoreType} from "../../redux/reduxStore";
import {PostType} from "../../redux/reducers/posts/types";
import styled from "styled-components";

type Props = PropsFromRedux

const PostsBlock = styled.div`
    margin: 30px auto;
    height: auto;
`

const Posts = ({posts, getPosts}: Props) => {
    useEffect(() => {
        getPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PostsBlock>
            {posts.map((post: PostType) => (
                <Post key={post.key} post={post}/>
                )
            )}
        </PostsBlock>
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