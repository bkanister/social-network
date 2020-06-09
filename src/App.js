import React, {useEffect} from 'react'
import './index.css'
import Navbar from "./components/Navbar/Navbar";
import ChatList from "./components/ChatList/ChatList";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyChats from "./pages/MyChats/MyChats";
import MyFriends from "./pages/MyFriends/MyFriends";
import MyTasks from "./pages/MyTasks/MyTasks";
import {downloadUsersCreator, usersAreLoadingCreator} from "./redux/reducers/usersReducer";
import {downloadPostsCreator} from "./redux/reducers/postsReducer";
import axios from "axios";
import {Provider} from "react-redux";
import store from "./redux/reduxStore";
import UserProfile from "./components/UsersProfile/UsersProfile";
import Authentication from "./components/AuthenticationPage/AuthenticationPage";


const App = props => {
    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=100&page=${props.state.users.currentPage}`)
            .then((response) => {
                props.dispatch(usersAreLoadingCreator())
                return response
            })
            .then((response) => {
                props.dispatch(downloadUsersCreator(response.data));
            })

        axios.get('https://social-network-7c6c6.firebaseio.com/posts.json')
            .then((response) => {
                props.dispatch(downloadPostsCreator(response.data))
        })
    }, [props.state.users.currentPage]);

    return (
        <Provider
            store={store}>
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route exact path={'/'} render={() => <MyProfile
                            posts={props.state.posts.posts}
                            dispatch={props.dispatch}
                            textareaValue={props.state.posts.textareaValue}
                            postImage={props.state.posts.postImage}/>}
                        />
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
                        <Route path={'/auth'} render={() => <Authentication dispatch={props.dispatch}
                                                                            userName={props.state.profile.userName}
                                                                            userEmail={props.state.profile.userEmail}
                                                                            userPassword={props.state.profile.userPassword}
                        />}/>
                    </Switch>
                    <ChatList users={props.state.users.users}
                              avatar={props.state.users.defaultUserAvatar}
                    />
                </div>
            </BrowserRouter>
        </Provider>

    )
}


export default App
