import React, { Component } from 'react';
import { connect } from "react-redux";

import ProfileForm from '../components/ProfileForm';
import history from '../history';

class Profile extends Component {
        render() {
                if (this.props.loggedIn)
                return (
                        <ProfileForm/>
                )
                else {
                        history.push('/login');
                        return null;
                }
        }
}

function mapStateToProps(state) {
        return {
                loggedIn: state.userReducer.loggedIn,
        }
}

export default connect(mapStateToProps)(Profile);
