import React, { Component } from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import { connect } from "react-redux";

import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import LoginF from './pages/LoginF';
import LikedPost from './pages/LikedPost';
import OwnPost from './pages/OwnPost';

import {fetchUser} from './action/userAction';
import {fetchPosts} from './action/postAction';


import history from './history';


class App extends Component {
        // async componentDidMount() {
        //         await this.props.dispatch(fetchUser());
        //         await this.props.dispatch(fetchPosts());
        // }


  render() {
    return (
                    <div className='home_page'>
                        <Router history={history} basename={process.env.PUBLIC_URL}>
                                <NavBar/>
                                <Switch>
                                  <Route path='/' exact component={Login}/>
                                  <Route path='/home' component={Home}/>
                                  <Route path='/profile' component={Profile}/>
                                  <Route path='/createPost' component={CreatePost}/>
                                  <Route path='/posts/:post_id' component={PostDetail}/>
                                  <Route path='/likePosts' component={LikedPost}/>
                                  <Route path='/ownPosts' component={OwnPost}/>
                                </Switch>
                        </Router>

                    </div>
    )
    // return (
    //         <Login/>
    // )
  }
}

export default connect()(App);
