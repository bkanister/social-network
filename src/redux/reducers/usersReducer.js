import {
    DOWNLOAD_USERS,
    SET_CURRENT_PAGE_NUMBER, USERS_ARE_LOADING
} from "./constants";

const initialState = {
    defaultUserAvatar: 'https://art.pixilart.com/1f127be4c0f2913.png',
    currentUserProfile: {
        id: 2,
        info: {}
    },
    users: [],
    currentPage: 1,
    isLoading: false,
    totalUsersCount: 0
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CURRENT_PAGE_NUMBER:
            return {
                ...state,
                currentPage: action.pageNumber
            }

        case USERS_ARE_LOADING:
            return {
                ...state,
                isLoading: true
            }

        case DOWNLOAD_USERS:
                return {
                    ...state,
                    users: action.data.items,
                    isLoading: false,
                    totalUsersCount: action.data.totalCount
                }

        case 'SET_CURRENT_USER_PROFILE':
            return {
                ...state,
                currentUserProfile: {
                    ...state.currentUserProfile,
                    id: action.userId
                }
            }

        case 'SET_USER_PROFILE_INFO':
            return {
                ...state,
                currentUserProfile: {
                    ...state.currentUserProfile,
                    info: action.payload
                }
            }

        default: return state
    }
}

export const downloadUsersCreator = (data) => ({type: DOWNLOAD_USERS, data})
export const usersAreLoadingCreator = () => ({type: USERS_ARE_LOADING})
export const setCurrentPageNumberCreator = (pageNumber) => ({type: SET_CURRENT_PAGE_NUMBER, pageNumber})

export default usersReducer