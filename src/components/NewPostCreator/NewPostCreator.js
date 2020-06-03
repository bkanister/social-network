import React, {useRef} from 'react'
import classes from '../NewPostCreator/NewPostCreator.module.css'
import {addPostCreator, inputChangeCreator} from "../../redux/reducers/reducers";
import ImageInput from "../ImageHandler/ImageInput";
import ImageInputContainer from "../ImageHandler/ImageInputContainer";



const NewPostCreator = props => {
const textInput = useRef(null);
    return (
        <div className={classes.NewPostCreator}>
            <textarea ref={textInput}
                      name="newPost"
                      id="textarea"
                      placeholder="Add new post..."
                      value={props.textareaValue}
                      onChange={(e) => props.dispatch(inputChangeCreator(e.target.value))}
            />
            <footer>
                <div>
                    <ImageInputContainer dispatch={props.dispatch} postImage={props.postImage}>
                        {props.children}
                    </ImageInputContainer>
                    <p>add photo or emoji</p>
                </div>
                <button onClick={() => {
                    props.dispatch(addPostCreator(textInput.current.value));
                }}>Add post</button>
            </footer>
        </div>
    )
}

export default NewPostCreator