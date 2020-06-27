import React, {FC} from 'react'
import classes from '../NewPostCreator/NewPostCreator.module.css'
import {addPostThunkAC} from "../../redux/reducers/posts/postsReducer";
import ImageInputContainer from "../ImageHandler/ImageInputContainer";
import {connect, ConnectedProps} from "react-redux";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {Textarea} from "../formComponents/Textarea";
import {minLength, required} from "../../validators";
import {Button} from "react-bootstrap";

const minLength10 = minLength(10)
interface Props {}

const NewPostCreator: FC<Props & PropsFromRedux & InjectedFormProps<{}, PropsFromRedux>> = (props: any) => {
    return (
        <div className={classes.NewPostCreator}>
            <form onSubmit={props.handleSubmit}>
                <Field name='newPost' type='text'
                       component={Textarea}
                       placeholder='add new post...'
                       validate={[required, minLength10]}/>
                    <ImageInputContainer exactPath={'posts'}/>
                    <Button type='submit'>Add post</Button>
            </form>
        </div>
    )
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (formData: any) => {
            dispatch(addPostThunkAC(formData.newPost));
            dispatch(reset('newPostCreator'));
        }
    }
}

const NewPostForm = reduxForm<{}, PropsFromRedux>({
    form: 'newPostCreator'
})(NewPostCreator);

const connector =  connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NewPostForm)