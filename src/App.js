import React, {Component} from 'react'
import './index.css'
import Navbar from "./components/Navbar/Navbar";
import ChatList from "./components/ChatList/ChatList";
import {BrowserRouter, Route} from "react-router-dom";
import MyProfile from "./pages/MyProfile/MyProfile";
import MyTeam from "./pages/MyTeam/MyTeam";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: 'https://image.spreadshirtmedia.net/image-server/v1/mp/designs/170224352,width=178,height=178,version=1579272891/benzinkanister-ersatz-tanken.png',
            users: [],
            posts: []
        }
    }

    componentDidMount() {
        fetch('https://randomuser.me/api/?results=4')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    users: json.results
                })
            });

        fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    posts: json
                })
            })
    }

    render() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Route exact path={'/'}>
                    <MyProfile avatar={this.state.avatar} posts={this.state.posts}/>
                </Route>
                <Route path={'/my-team'} component={MyTeam}/>
                <ChatList users={this.state.users}/>
            </div>
        </BrowserRouter>
    )
  }
}


export default App
