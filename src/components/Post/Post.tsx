import React, {useState} from 'react'
import {deletePostThunkAC} from "../../redux/reducers/posts/postsReducer";
import {connect, ConnectedProps} from "react-redux";
import ModalWindow from "../Modal/Modal";
import {StoreType} from "../../redux/reduxStore";
import { PostType } from '../../redux/reducers/posts/types';
import styled from 'styled-components'
import PostHeader from './PostHeader';
import PostFooter from "./PostFooter";


//types
type Props = PropsFromRedux & {
    post: PostType
}

//styles

const PostStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 15px;
    background: white;
    box-shadow: 0 0 15px -4px rgba(0,0,0,0.16);
    border-radius: 7px;
    padding: 25px;
`



const Body = styled.div`
  margin-bottom: 20px;
`
const Image = styled.img`
  width: 100%;
`



const Post = ({avatar, name, deletePost, post}: Props) => {
    const [show, setShow] = useState(false);

    const onDeletePost = () => {
        setShow(true);
    }

    const onCancelDelete = () => {
        setShow(false);
    }

    return (
        <PostStyled>
            {show && <ModalWindow text={'delete your post'} show={show} custom={post.key}
                                  confirm={deletePost}
                                  cancel={onCancelDelete}/>}
            <PostHeader avatar={avatar} name={name}
                        date={post.date} onDelete={onDeletePost}/>
            <Body>
                <p>{post.body}</p>
                { post.img
                    ? <p><Image src={post.img} alt=""/></p>
                    : null }
            </Body>
            <PostFooter/>
        </PostStyled>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        avatar: state.profile.avatar,
        name: state.profile.firstName
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        deletePost: (postKey: string) => dispatch(deletePostThunkAC(postKey))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Post)