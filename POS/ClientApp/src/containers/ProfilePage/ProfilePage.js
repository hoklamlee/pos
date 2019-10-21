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

    }



    render() {

        return (
            <div style={{marginTop:'10vh'}}>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">User Name</Label>
                        <Input type="text" name="userName" id="userName" placeholder="" defaultValue={this.props.user.username} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password Confirm</Label>
                        <Input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="" />
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
            </div>
         
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn,user } = state.authentication;
    return {
        loggingIn, user
    };
}

const connectedProfilePage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ProfilePage);
export { connectedProfilePage as ProfilePage };









