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
import {AvatarContext} from "./context";
import axios from "axios";


const App = props => {
    debugger
    useEffect(() => {
        axios.get(`https://randomuser.me/api/?inc=name,picture,login&page=${props.state.currentFriendsPageNumber}&results=10`)
            .then((response) => {
                props.dispatch(usersAreLoadingCreator(true))
                return response
            })
            .then((response) => {
                props.dispatch(downloadUsersCreator(response.data.results));
            })


        axios.get('https://social-network-7c6c6.firebaseio.com/posts.json')
            .then((response) => {
                props.dispatch(downloadPostsCreator(response.data))
        }) // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.state.currentFriendsPageNumber]);

    return (
        <AvatarContext.Provider
            value={props.state.posts}>
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route exact path={'/'} render={() => <MyProfile
                            posts={props.state.posts.posts}
                            dispatch={props.dispatch}
                            textareaValue={props.state.posts.textareaValue}
                            postImage={props.state.posts.postImage}
                        />
                        }/>
                        <Route path={'/my-chats'} render={() => <MyChats
                            users={props.state.users.users}
                            messages={props.state.posts.posts}
                        />}/>
                        <Route path={'/my-friends'} render={() => <MyFriends
                                                                    users={props.state.users.users}
                                                                    dispatch={props.dispatch}
                                                                    usersAreLoading={props.state.users.usersAreLoading}
                                                                />}/>
                        <Route path={'/my-tasks'} component={MyTasks}/>
                    </Switch>
                    <ChatList users={props.state.users.users}/>
                </div>
            </BrowserRouter>
        </AvatarContext.Provider>

    )
}


export default App
