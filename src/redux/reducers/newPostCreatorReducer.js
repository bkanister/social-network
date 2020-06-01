const ADD_POST = 'ADD_POST';
const INPUT_CHANGE = 'INPUT_CHANGE';

const newPostCreatorReducer = (state, action) => {
    if (action.type === ADD_POST) {
        const newPost = {
            userId: 1,
            id: state.posts.length + 1,
            title: '',
            body: state.textareaValue
        };
        state.posts.push(newPost);
        state.textareaValue = '';
    } else if (action.type === INPUT_CHANGE) {
        state.textareaValue = action.inputText;
    }
    return state
}

export const addPostCreator = () => ({type: ADD_POST})
export const inputChangeCreator = (inputText) => ({type: INPUT_CHANGE, inputText})


export default newPostCreatorReducer