import React from 'react'
import classes from '../NewPostCreator/NewPostCreator.module.css'
import {addPostThunkAC} from "../../redux/reducers/postsReducer";
import ImageInputContainer from "../ImageHandler/ImageInputContainer";
import {connect} from "react-redux";
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../formComponents/Textarea";
import {minLength, required} from "../../validators";

const minLength10 = minLength(10)

let NewPostCreator = props => {
    return (
        <div className={classes.NewPostCreator}>
            <form onSubmit={props.handleSubmit}>
                <Field name='newPost' type='text'
                       component={Textarea}
                       placeholder='add new post...'
                       validate={[required, minLength10]}/>
                    <ImageInputContainer/>
                    <button>Add post</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        textareaValue: state.posts.textareaValue,
        postImage: state.posts.postImage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (formData) => {
            dispatch(addPostThunkAC(formData.newPost));
            dispatch(reset('newPostCreator'));
        }
    }
}

NewPostCreator = reduxForm({
    form: 'newPostCreator'
})(NewPostCreator);

export default connect(mapStateToProps, mapDispatchToProps)(NewPostCreator)