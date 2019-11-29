import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/User';
import config from 'react-global-configuration';

import EditableTable from '../../components/AntTable';
import ReactStrapFrom from '../../components/ReactStrapForm';
import PageHeader from '../../components/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { history } from '../../helpers/history';

class EditUserPage extends React.Component {
    constructor(props) {
        super(props);

        const userId = this.props.match.params.id;
        console.log(userId);

        this.props.getUserById(userId);

        this.submitForm = this.submitForm.bind(this);
        this.goBack = this.goBack.bind(this);

        //this.submitInfo = this.submitInfo.bind(this);

    }




    //submitInfo(event) {
    //    event.preventDefault();

    //    var userId = this.props.user.userId;
    //    var username = event.target[0].value;
    //    var email = event.target[1].value;
    //    var lastName = event.target[2].value;
    //    var firstName = event.target[3].value;
    //    console.log(userId, firstName, lastName, email, username);
    //    this.props.updateUserInfo(userId, firstName, lastName, email, username);
    //}

    submitForm(event) {
        event.preventDefault();


        var firstName = event.target[0].value;
        var lastName = event.target[1].value;
        var username = event.target[2].value;
        var email = event.target[3].value;
        var password = event.target[4].value;
        var displayName = event.target[5].value;

        //var currentUserId = JSON.parse(localStorage.getItem('user')).userId;
        const userId = this.props.match.params.id;

        this.props.updateUser(userId, firstName, lastName, username, email, password, displayName).then(success => {
            if (success) {
                this.props.history.goBack();
            }
        })
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <PageHeader
                    left={<div style={{ display: 'inline', float: 'left' }}><a style={{ marginBottom: 10 }} onClick={this.goBack}><FontAwesomeIcon icon={faArrowLeft} /> Back</a></div>}
                    right={<div style={{ display: 'inline', float: 'right' }}>Edit User</div>}
                />

                {
                    this.props.item ?
                        <ReactStrapFrom
                            onSubmit={this.submitForm}
                            fields={
                                [{
                                    label: "First Name",
                                    type: "text",
                                    id: "firstName",
                                    placeHolder: "",
                                    defaultValue: this.props.item.firstName
                                }, {
                                        label: "Last Name",
                                        type: "text",
                                        id: "lastName",
                                        placeHolder: "",
                                        defaultValue: this.props.item.lastName
                                    }
                                    , {
                                        label: "Username",
                                        type: "text",
                                        id: "username",
                                        placeHolder: "",
                                        defaultValue: this.props.item.username
                                    }, {
                                        label: "Email",
                                        type: "email",
                                        id: "Email",
                                        placeHolder: "",
                                        defaultValue: this.props.item.email
                                    }, {
                                        label: "Password",
                                        type: "password",
                                        id: "Password",
                                        placeHolder: "",
                                        defaultValue: this.props.item.password
                                    }, {
                                        label: "Display Name",
                                        type: "text",
                                        id: "displayName",
                                        placeHolder: "",
                                        defaultValue: this.props.item.displayName
                                    }]
                            }
                        />
                        :
                        <div></div>
                }

            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loggingIn, item } = state.user;
    return {
        loggingIn, item
    };
}

const connectedEditUserPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(EditUserPage);
export { connectedEditUserPage as EditUserPage };









