import React, {useRef} from 'react'
import classes from '../NewPostCreator/NewPostCreator.module.css'
import {addPostThunkAC, inputChangeCreator} from "../../redux/reducers/postsReducer";
import ImageInputContainer from "../ImageHandler/ImageInputContainer";
import {connect} from "react-redux";


const NewPostCreator = props => {
const textInput = useRef(null);
    return (
        <div className={classes.NewPostCreator}>
            <textarea ref={textInput}
                      name="newPost"
                      id="textarea"
                      placeholder="Add new post..."
                      value={props.textareaValue}
                      onChange={(e) => props.handleInputChange(e.target.value)}
            />
            <footer>
                <div>
                    <ImageInputContainer>
                        {props.children}
                    </ImageInputContainer>
                    <p>add photo or emoji</p>
                </div>
                <button onClick={props.addPost}>Add post</button>
            </footer>
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
        handleInputChange: (value) => dispatch(inputChangeCreator(value)),
        addPost: () => dispatch(addPostThunkAC())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostCreator)