import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/User';
import config from 'react-global-configuration';

class ProfilePage extends React.Component {
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

    submitPassword(event) {
        event.preventDefault();

        var userId = this.props.user.userId;
        var password = event.target[0].value;
        var passwordConfirm = event.target[1].value;


        this.props.updatePassword(userId, password, passwordConfirm);
    }

    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <h4>Basic Info</h4>
                <Form onSubmit={this.submitInfo}>
                    <FormGroup>
                        <Label for="exampleEmail">User Name</Label>
                        <Input type="text" name="userName" id="userName" placeholder="" defaultValue={this.props.user.username} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="" defaultValue={this.props.user.email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Last Name</Label>
                        <Input type="text" name="lastName" id="lastName" placeholder="" defaultValue={this.props.user.lastName} />
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">First Name</Label>
                        <Input type="text" name="firstName" id="firstName" placeholder="" defaultValue={this.props.user.firstName} />
                    </FormGroup>


                    <Button>Save</Button>
                </Form>

                <h4>Update Password</h4>
                <Form onSubmit={this.submitPassword}>

                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password Confirm</Label>
                        <Input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="" />
                    </FormGroup>

                    <Button>Save</Button>

                </Form>

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









