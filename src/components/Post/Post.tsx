import React, {useState} from 'react'
import classes from '../Post/Post.module.css'
import {deletePostThunkAC} from "../../redux/reducers/posts/postsReducer";
import {connect, ConnectedProps} from "react-redux";
import ModalWindow from "../Modal/Modal";
import Button from "react-bootstrap/Button";
import {StoreType} from "../../redux/reduxStore";
import { PostType } from '../../redux/reducers/posts/types';

type Props = PropsFromRedux & {
    post: PostType
}

const Post = ({avatar, deletePost, post}: Props) => {
    const [show, setShow] = useState(false);

    const onDeletePost = () => {
        setShow(true);
    }

    const onCancelDelete = () => {
        setShow(false);
    }

    return (
        <div className={classes.Post}>
            <div className={classes.postContent}>
                <img className={classes.avatar} src={avatar} alt="Avatar"/>
                <div>
                    <p className={classes.postText}>{post.body}</p>
                    {post.img ? <p><img className={classes.postImg} src={post.img} alt=""/></p> : null}
                </div>
                <Button variant="outline-danger" onClick={onDeletePost} size='sm'>&times;</Button>
            </div>
            <footer>
                <p>{post.date}</p>
                <p>10 Likes</p>
            </footer>
            {show && <ModalWindow show={show} postKey={post.key}
                                  confirmDelete={deletePost}
                                  cancelDelete={onCancelDelete}/>}
        </div>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        avatar: state.posts.avatar
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