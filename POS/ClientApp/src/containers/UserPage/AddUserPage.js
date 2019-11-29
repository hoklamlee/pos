import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/User';
import config from 'react-global-configuration';

import ReactStrapFrom from '../../components/ReactStrapForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PageHeader from '../../components/PageHeader';
import { history } from '../../helpers/history';

class AddUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.goBack = this.goBack.bind(this);
    }


    submitForm(event) {
        event.preventDefault();

        var firstName = event.target[0].value;
        var lastName = event.target[1].value;
        var username = event.target[2].value;
        var email = event.target[3].value;
        var password = event.target[4].value;
        var displayName = event.target[5].value;

        var userId = JSON.parse(localStorage.getItem('user')).userId;

        this.props.addUser(firstName,lastName,username,email,password,displayName).then(success => {
            if (success) {
                this.props.history.goBack();
            }
        });
    }

    goBack() {
        this.props.history.goBack();
    }


    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <PageHeader
                    left={<div style={{ display: 'inline', float: 'left' }}><a style={{ marginBottom: 10 }} onClick={this.goBack}><FontAwesomeIcon icon={faArrowLeft} /> Back</a></div>}
                    right={<div style={{ display: 'inline', float: 'right' }}>New User</div>}
                />


                <ReactStrapFrom
                    onSubmit={this.submitForm}
                    fields={
                        [{
                            label: "First Name",
                            type: "text",
                            id: "firstName",
                            placeHolder: ""
                        }, {
                            label: "Last Name",
                            type: "text",
                            id: "lastName",
                            placeHolder: ""
                        }
                            , {
                            label: "Username",
                            type: "text",
                            id: "username",
                            placeHolder: ""
                        }, {
                            label: "Email",
                            type: "email",
                            id: "Email",
                            placeHolder: ""
                        }, {
                            label: "Password",
                            type: "password",
                            id: "Password",
                            placeHolder: ""
                        }, {
                            label: "Display Name",
                            type: "text",
                            id: "displayName",
                            placeHolder: ""
                        }]
                    } />
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

const connectedAddUserPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AddUserPage);
export { connectedAddUserPage as AddUserPage };








