import React, {useEffect} from 'react'
import './index.css'
import Navbar from "./components/Navbar/Navbar";
import ChatList from "./components/ChatList/ChatList";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyChats from "./pages/MyChats/MyChats";
import MyFriends from "./pages/MyFriends/MyFriends";
import MyTasks from "./pages/MyTasks/MyTasks";
import {downloadPostsCreator, downloadUsersCreator} from "./redux/reducers/reducers";
import {AvatarContext} from "./context";
import axios from "axios";

const App = props => {

    useEffect(() => {
        props.dispatch(downloadUsersCreator(props.state));

        axios.get('https://social-network-7c6c6.firebaseio.com/posts.json')
            .then((response) => {
                console.log(response.data)
                props.dispatch(downloadPostsCreator(response.data))
        })
    }, []);

    return (
        <AvatarContext.Provider
            value={props.state}>
            <BrowserRouter>
                <div className="App">
                    <Navbar/>
                    <Switch>
                        <Route exact path={'/'} render={() => <MyProfile
                            posts={props.state.posts}
                            dispatch={props.dispatch}
                            textareaValue={props.state.textareaValue}
                            postImage={props.state.postImage}
                        />
                        }/>
                        <Route path={'/my-chats'} render={() => <MyChats
                            users={props.state.users}
                            messages={props.state.posts}
                        />}/>
                        <Route path={'/my-friends'} component={MyFriends}/>
                        <Route path={'/my-tasks'} component={MyTasks}/>
                    </Switch>
                    <ChatList users={props.state.users}/>
                </div>
            </BrowserRouter>
        </AvatarContext.Provider>

    )
}


export default App
