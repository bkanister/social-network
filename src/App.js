import React, {Component} from 'react'
import './index.css'
import Navbar from "./components/Navbar/Navbar";
import ChatList from "./components/ChatList/ChatList";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyTeam from "./pages/MyTeam/MyTeam";
import MyFriends from "./pages/MyFriends/MyFriends";
import MyTasks from "./pages/MyTasks/MyTasks";

const App = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         avatar: 'https://image.spreadshirtmedia.net/image-server/v1/mp/designs/170224352,width=178,height=178,version=1579272891/benzinkanister-ersatz-tanken.png',
    //         users: [],
    //         posts: []
    //     }
    // }

    // componentDidMount() {
    //     fetch('https://randomuser.me/api/?results=4')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 users: json.results
    //             })
    //         });
    //
    //     fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({
    //                 posts: json
    //             })
    //         })
    // }

    // addNewPost = postText => {
    //     const newPost = {
    //         userId: 1,
    //         id: this.state.posts.length + 1,
    //         title: '',
    //         body: postText
    //     };
    //     const newPosts = [...this.state.posts, newPost];
    //     this.setState({
    //         posts: newPosts
    //     });
    // };
    //
    // deletePost = postId => {
    //     const oldPosts = [...this.state.posts];
    //     const newPosts = oldPosts.filter(post => {
    //         return post.id !== postId;
    //     })
    //     this.setState({
    //         posts: newPosts
    //     })
    // }

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Switch>
                    <Route exact path={'/'} render={() => <MyProfile
                                                                avatar={props.state.avatar}
                                                                posts={props.state.posts}
                                                                addNewPost={props.addNewPost}
                                                                deletePost={props.deletePost}
                                                                textareaValue={props.state.textareaValue}
                                                                changeInputHandler={props.changeInputHandler}
                    />
                    }/>
                    <Route path={'/my-team'} component={MyTeam}/>
                    <Route path={'/my-friends'} component={MyFriends}/>
                    <Route path={'/my-tasks'} component={MyTasks}/>
                </Switch>
                <ChatList users={props.state.users}/>
            </div>
        </BrowserRouter>
    )
}


export default App
