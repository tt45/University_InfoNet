import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';

class App extends Component {
  render() {
    return (

            <div className='home_page'>
                <NavBar/>
                <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                  <Route path='/Home' component={Home}/>
                  <Route path='/profile' component={Profile}/>
                </Switch>
                </Router>

            </div>
    )
  }
}

export default App;
