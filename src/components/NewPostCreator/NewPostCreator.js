import React from 'react'
import classes from '../NewPostCreator/NewPostCreator.module.css'

const NewPostCreator = props => {
    return (
        <div className={classes.NewPostCreator}>
            <textarea name="newPost" id="newPost" placeholder="Add new post..."></textarea>
            <footer>
                <div>add photo or emoji</div>
                <button>Add post</button>
            </footer>
        </div>
    )
}

export default NewPostCreator