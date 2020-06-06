import {
    DOWNLOAD_USERS,
    SET_CURRENT_PAGE_NUMBER, USERS_ARE_LOADING
} from "./constants";

const initialState = {
    users: [],
    currentFriendsPageNumber: 1,
    usersAreLoading: false,
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_PAGE_NUMBER:
            return {
                ...state,
                currentFriendsPageNumber: action.pageNumber
            }

        case DOWNLOAD_USERS:
                return {
                    ...state,
                    users: action.users,
                    usersAreLoading: false
                }

        case USERS_ARE_LOADING:
            return {
                ...state,
                usersAreLoading: action.usersAreLoading
            }

        default: return state
    }
}

export const downloadUsersCreator = (users) => ({type: DOWNLOAD_USERS, users})
export const usersAreLoadingCreator = (usersAreLoading) => ({type: USERS_ARE_LOADING, usersAreLoading})
export const setCurrentPageNumberCreator = (pageNumber) => ({type: SET_CURRENT_PAGE_NUMBER, pageNumber})

export default usersReducer