import React, { Component } from 'react';
import {InputGroup, FormControl, Button, ButtonToolbar} from 'react-bootstrap';
import { connect } from "react-redux";

import './Home.scss'
import PostItem from '../components/PostItem';
import {filterPosts, searchPosts} from '../action/postAction'


class Home extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        input: '',
                }
                this.inputChange = this.inputChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
        }

        inputChange(event) {
                this.setState({input: event.target.value});
        }

        handleSubmit(event) {
                this.props.dispatch(searchPosts(this.state.input));
        }

        handleCategory(category) {
                this.props.dispatch(filterPosts(category));

        }

        render() {
                const {posts} = this.props;
                return (
                        <div className='home_page'>
                                <InputGroup className="input_group mb-3">
                                    <FormControl
                                      placeholder="I'm feeling lucky"
                                      aria-describedby="basic-addon2"
                                      onChange={this.inputChange}
                                    />
                                    <InputGroup.Append>
                                      <Button variant="outline-secondary" onClick={this.handleSubmit}>Search</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <ButtonToolbar className='button_group'>
                                  <Button variant="outline-dark" onClick={()=>this.handleCategory('')}>All</Button>
                                  <Button variant="outline-primary" onClick={()=>this.handleCategory('food')}>Food</Button>
                                  <Button variant="outline-secondary" onClick={()=>this.handleCategory('housing')}>Housing</Button>
                                  <Button variant="outline-success" onClick={()=>this.handleCategory('events')}>Events</Button>
                                  <Button variant="outline-warning" onClick={()=>this.handleCategory('health')}>Health</Button>
                                  <Button variant="outline-danger" onClick={()=>this.handleCategory('course')}>Course</Button>
                                  <Button variant="outline-info" onClick={()=>this.handleCategory('miscellaneous')}>Misc.</Button>
                                </ButtonToolbar>
                                {posts.map((post)=>
                                        <PostItem key={post._id} {...post}/>)}
                        </div>
                )
        }
}

function mapStateToProps(state) {
        const {posts, filter_category, search_input} = state.postReducer;
        const display_post = filter_category===''?posts:posts.filter((post)=>post.category===filter_category);
        return {
                posts: search_input===''?display_post:display_post.filter(post=>post.title.includes(search_input)),
        }
}

function mapDispatchToProps(dispatch) {
  return {
    filterPosts: (category) => {dispatch(filterPosts(category))}
  };
}

export default connect(mapStateToProps)(Home);
