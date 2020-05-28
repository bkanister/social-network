import React, {useEffect} from 'react'
import './index.css'
import Navbar from "./components/Navbar/Navbar";
import ChatList from "./components/ChatList/ChatList";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyChats from "./pages/MyChats/MyChats";
import MyFriends from "./pages/MyFriends/MyFriends";
import MyTasks from "./pages/MyTasks/MyTasks";

const App = props => {
    useEffect(() => {
        props.getUsers();
        props.getPosts();
    }, []);
    debugger

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Switch>
                    <Route exact path={'/'} render={() => <MyProfile
                                                                avatar={props.state.avatar}
                                                                posts={props.state.posts}
                                                                dispatch={props.dispatch}
                                                                textareaValue={props.state.textareaValue}
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
    )
}


export default App
