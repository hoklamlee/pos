import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/User';
import config from 'react-global-configuration';

class InventoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.submitInfo = this.submitInfo.bind(this);
        this.submitPassword = this.submitPassword.bind(this);

    }

    


    submitInfo(event) {
        event.preventDefault();

        var userId = this.props.user.userId;
        var username = event.target[0].value;
        var email = event.target[1].value;
        var lastName = event.target[2].value;
        var firstName = event.target[3].value;
        console.log(userId, firstName, lastName, email, username);
        this.props.updateUserInfo(userId, firstName, lastName, email, username);
    }



    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <div class="row">
                    <div class="col-4">
                        <div class="list-group" id="list-tab" role="tablist">
                            <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Home</a>
                            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Profile</a>
                            <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Messages</a>
                            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Settings</a>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
                            <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
                            <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                            <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    return {
        loggingIn, user
    };
}

const connectedProfilePage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ProfilePage);
export { connectedProfilePage as ProfilePage };









