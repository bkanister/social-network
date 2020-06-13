import React, {useEffect} from 'react'
import './index.css'
import Navbar from "./components/Navbar/Navbar";
import ChatList from "./components/ChatList/ChatList";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyChats from "./pages/MyChats/MyChats";
import MyFriends from "./pages/MyFriends/MyFriends";
import MyTasks from "./pages/MyTasks/MyTasks";
import {Provider} from "react-redux";
import store from "./redux/reduxStore";
import UserProfile from "./components/UsersProfile/UsersProfile";
import Authentication from "./components/AuthenticationPage/Authentication";
import {getUsers} from "./firebase/firebaseRequests";
import {auth} from './firebase/firebase'
import {setUserId} from "./redux/reducers/profileReducer";

const App = props => {
    useEffect(() => {
        auth.onAuthStateChanged((user) => { // saves sign-in after page reload
            user ? props.dispatch(setUserId(user.uid)) : console.log('no user')
        })
    }, [])

    useEffect(() => {
        getUsers(props.dispatch, props.state.users.currentPage)
    }, [props.state.users.currentPage]);

    return (
        <Provider
            store={store}>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" render={() => <MyProfile userID={props.state.profile.userID}
                                                                  posts={props.state.posts.posts}
                                                                  dispatch={props.dispatch}
                                                                  textareaValue={props.state.posts.textareaValue}
                                                                  postImage={props.state.posts.postImage}/>}>
                        </Route>
                        <Route exact path={'/profile/:id'} render={() => <UserProfile
                                                                dispatch={props.dispatch}
                                                                userInfo={props.state.users.currentUserProfile.info}
                                                                avatar={props.state.users.defaultUserAvatar}
                                                                          />}/>
                        <Route path={'/my-chats'} render={() => <MyChats
                                                                users={props.state.users.users}
                                                                messages={props.state.posts.posts}
                        />}/>
                        <Route path={'/my-friends'} render={() => <MyFriends
                                                                users={props.state.users.users}
                                                                dispatch={props.dispatch}
                                                                isLoading={props.state.users.isLoading}
                                                                avatar={props.state.users.defaultUserAvatar}
                                                                totalUsersCount={props.state.users.totalUsersCount}
                                                                currentUserProfile={props.state.users.currentUserProfile}
                                                                />}/>
                        <Route path={'/my-tasks'} component={MyTasks}/>
                        <Route path={'/auth'} render={() => <Authentication
                                                                dispatch={props.dispatch}
                                                                userName={props.state.profile.userName}
                                                                userEmail={props.state.profile.userEmail}
                                                                userPassword={props.state.profile.userPassword}
                                                                userID={props.state.profile.userID}
                        />}>
                        </Route>
                    </Switch>
                    <ChatList users={props.state.users.users}
                              avatar={props.state.users.defaultUserAvatar}
                    />
                </div>
        </Provider>

    )
}


export default App
