import React, { Component } from 'react';
import {InputGroup, FormControl, Button, ButtonToolbar} from 'react-bootstrap';

import './Home.scss'
import PostItem from '../components/PostItem'

class Home extends Component {
        render() {
                return (
                        <div className='home_page'>
                                <InputGroup className="input_group mb-3">
                                    <FormControl
                                      placeholder="I'm feeling lucky"

                                      aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Append>
                                      <Button variant="outline-secondary">Search</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                                <ButtonToolbar className='button_group'>
                                  <Button variant="outline-primary">Food</Button>
                                  <Button variant="outline-secondary">Housing</Button>
                                  <Button variant="outline-success">Events</Button>
                                  <Button variant="outline-warning">Health</Button>
                                  <Button variant="outline-danger">Course</Button>
                                  <Button variant="outline-dark">Misc.</Button>
                                </ButtonToolbar>
                                <PostItem className='post_group'/>
                                <PostItem className='post_group'/>
                                <PostItem className='post_group'/>
                                <PostItem className='post_group'/>
                        </div>
                )
        }
}

export default Home;
