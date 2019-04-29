import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { connect } from "react-redux";

import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';

import {fetchUser} from './action/userAction';
import {fetchPosts} from './action/postAction';

class App extends Component {
        async componentDidMount() {
                await this.props.dispatch(fetchUser());
                await this.props.dispatch(fetchPosts());
        }


  render() {
    return (
                    <div className='home_page'>
                        <Router basename={process.env.PUBLIC_URL}>
                                <NavBar/>
                                <Switch>
                                  <Route path='/home' component={Home}/>
                                  <Route path='/profile' component={Profile}/>
                                  <Route path='/createPost' component={CreatePost}/>
                                  <Route path='/posts/:post_id' component={PostDetail}/>
                                </Switch>
                        </Router>

                    </div>
    )
  }
}

export default connect()(App);
