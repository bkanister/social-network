import React, {useState} from 'react'
import classes from '../Post/Post.module.css'
import {deletePostThunkAC} from "../../redux/reducers/posts/postsReducer";
import {connect} from "react-redux";
import ModalWindow from "../Modal/Modal";
import Button from "react-bootstrap/Button";


const Post = props => {
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
                <img className={classes.avatar} src={props.avatar} alt="Avatar"/>
                <div>
                    <p className={classes.postText}>{props.post.body}</p>
                    {props.post.img ? <p><img className={classes.postImg} src={props.post.img} alt=""/></p> : null}
                </div>
                <Button variant="outline-danger" onClick={onDeletePost} size='sm'>&times;</Button>
            </div>
            <footer>
                <p>{props.post.date}</p>
                <p>10 Likes</p>
            </footer>
            {show && <ModalWindow show={show} postKey={props.post.key}
                                  confirmDelete={props.deletePost}
                                  cancelDelete={onCancelDelete}/>}
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
        deletePost: (postKey) => dispatch(deletePostThunkAC(postKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)