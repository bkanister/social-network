import React, {useRef} from 'react'
import classes from '../NewPostCreator/NewPostCreator.module.css'

const NewPostCreator = props => {
const textInput = useRef(null);
    return (
        <div className={classes.NewPostCreator}>
            <textarea ref={textInput}
                      name="newPost"
                      id="textarea"
                      placeholder="Add new post..."
                      value={props.textareaValue}
                      onChange={(e) => props.dispatch({type: 'INPUT_CHANGE', inputText: e.target.value})}
            />
            <footer>
                <div>add photo or emoji</div>
                <button onClick={() => {
                    props.dispatch({type: 'ADD_POST', postText: textInput.current.value});
                }}>Add post</button>
            </footer>
        </div>
    )
}

export default NewPostCreator