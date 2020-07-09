import React, {useEffect} from 'react'
import './index.css'
import Navigation from "./components/Navbar/Navigation";
import ChatList from "./components/ChatList/ChatList";
import {Route, Switch} from "react-router-dom";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyChats from "./pages/MyChats/MyChats";
import MyFriends from "./pages/MyFriends/MyFriends";
import {auth} from './firebase/firebase'
import {setUserId} from "./redux/reducers/profile/profileReducer";
import Authentication from "./components/AuthenticationPage/Authentication";
import {connect, ConnectedProps} from "react-redux";
import MyTasksContainer from "./pages/MyTasks/MyTasksContainer";
import {getUsersThunkAC} from "./redux/reducers/usersReducer";
import {StoreType} from "./redux/reduxStore";
import MainContent from "./components/UsersProfile/UsersProfile";

const App = ({state, dispatch}: PropsFromRedux) => {
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(setUserId(user.uid))
                dispatch(getUsersThunkAC())
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.profile.userID])


    return (
         <div className="App">
                <Navigation avatar={state.profile.avatar}/>
                <MyProfile/>
                <Switch>
                        <Route exact path={'/'} render={() => <MainContent/>}/>
                        <Route path={'/my-chats'} render={() => <MyChats
                            messages={state.chat.messages}
                        />}/>
                        <Route path={'/my-friends'} render={() => <MyFriends users={state.users.users}
                                                                             avatar={state.users.defaultUserAvatar}
                        />}/>
                        <Route path={'/my-tasks'} component={MyTasksContainer}/>
                        <Route path={'/auth'} render={() => <Authentication/>}/>
                    </Switch>
                <ChatList users={state.users.users}
                          avatar={state.users.defaultUserAvatar}
                />
                </div>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: dispatch
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)
