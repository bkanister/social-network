const DELETE_POST = 'DELETE_POST';

const postsReducer = (state, action) => {
    if (action.type === DELETE_POST) {
        debugger
        const newPosts = state.posts.filter(post => {
            return post.id !== action.postId;
        });
        state.posts = newPosts
        return state
    }
    return state
}

export const deletePostCreator = (postId) => ({type: DELETE_POST, postId})

export default postsReducer